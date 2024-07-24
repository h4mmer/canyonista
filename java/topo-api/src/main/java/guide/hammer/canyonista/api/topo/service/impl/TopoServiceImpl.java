package guide.hammer.canyonista.api.topo.service.impl;

import guide.hammer.canyonista.api.topo.model.DynamoDBDetail;
import guide.hammer.canyonista.api.topo.model.DynamoDBObstacle;
import guide.hammer.canyonista.api.topo.model.DynamoDBTopo;
import guide.hammer.canyonista.api.topo.repo.DynamoDBRepo;
import guide.hammer.canyonista.api.topo.service.TopoService;
import guide.hammer.canyonista.api.topo.service.TopoSvgService;
import guide.hammer.canyonista.db.enums.ObstacleExtensionType;
import guide.hammer.canyonista.db.enums.Type;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class TopoServiceImpl implements TopoService {
    private final TopoSvgService svgService;
    private final DynamoDBRepo repo;

    @Override
    public DynamoDBTopo getTopoOf(String name, String href, String quickTopoEntry) {

        DynamoDBTopo topo = DynamoDBTopo.builder()
                .name(name)
                .ids(Map.of("href", href))
                .obstacles(getTopo(quickTopoEntry))
                .build();
        repo.save(topo);
        return topo;
    }

    @Override
    public String getSVGOf(String name, String href, String quickTopoEntry) {
        return svgService.getTopoOf(getTopoOf(name, href, quickTopoEntry));
    }

    private List<DynamoDBObstacle> getTopo(String quickTopoEntry) {
        List<DynamoDBObstacle> obstacles = new ArrayList<>();
        if (StringUtils.hasText(quickTopoEntry)) {
            Pattern obstacleGroupPattern = Pattern.compile("[^ ]+");
            Matcher obstacleGroup = obstacleGroupPattern.matcher(quickTopoEntry);
            while (obstacleGroup.find()) {
                obstacles.addAll(decodeObstacleGroup(obstacleGroup.group()));
                obstacles.add(DynamoDBObstacle.builder().type(Type.Walk).value(10).details(List.of()).build());
            }
        }
        return obstacles;
    }

    List<DynamoDBObstacle> decodeObstacleGroup(String obstacleGroup) {
        List<DynamoDBObstacle> obstacles = new ArrayList<>();
        Pattern obstaclePattern = Pattern.compile("(C|R|MC|S|T|E|D|Walk|Swim)(\\d+)(r?D|r?G|r?d|r?g|l|L|R|r|c|C)?(u|U)?\\.?");
        Matcher obstacle = obstaclePattern.matcher(obstacleGroup);
        while (obstacle.find()) {
            obstacles.add(toObstacle(obstacle.group(1), obstacle.group(2), obstacle.group(3), obstacle.group(4)));
        }
        return obstacles;
    }

    private DynamoDBObstacle toObstacle(String type, String value, String direction, String pool) {
        List<DynamoDBDetail> details = new ArrayList<>(2);
        if (StringUtils.hasText(direction)) {
            details.add(DynamoDBDetail.builder()
                    .name(switch (direction.toLowerCase()) {
                        case "rd", "d", "r" -> "rd";
                        case "rg", "g", "l" -> "rg";
                        default -> "";
                    })
                    .type(direction.toLowerCase().equals(direction) ? ObstacleExtensionType.SingleAncor : ObstacleExtensionType.TwinAncor)
                    .build());
        }
        if ("u".equalsIgnoreCase(pool)) {
            details.add(DynamoDBDetail.builder().type(ObstacleExtensionType.Pool).build());
        }
        return DynamoDBObstacle.builder()
                .type(Type.get(type))
                .value(Integer.parseInt(value))
                .details(details)
                .build();
    }
}
