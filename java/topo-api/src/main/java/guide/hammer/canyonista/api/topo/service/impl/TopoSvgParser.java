package guide.hammer.canyonista.api.topo.service.impl;

import guide.hammer.canyonista.api.topo.model.DynamoDBDetail;
import guide.hammer.canyonista.api.topo.model.DynamoDBObstacle;
import guide.hammer.canyonista.api.topo.model.DynamoDBTopo;
import guide.hammer.canyonista.api.topo.model.PlacableGroup;
import guide.hammer.canyonista.api.topo.service.TopoSvgService;
import guide.hammer.canyonista.db.enums.Type;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class TopoSvgParser implements TopoSvgService {
    private static final int MARGIN_X = 10, MARGIN_Y = 10;

    @Override
    public String getTopoOf(DynamoDBTopo topo) {
        return "<svg width=\"400\" height=\"600\" xmlns=\"http://www.w3.org/2000/svg\">"
                + """
                <style>
                .label {
                stroke:none;
                text-anchor:start;
                font-family:arial;
                font-size:6px;
                fill:black;
                }
                                        path {
                                        stroke:black;
                                        stroke-width: 1px;
                                        fill:none;
                                        }
                                        .pool {
                                        fill: blue;
                                        }
                                
                                        .rock {
                                        fill: gray;
                                        stroke-width: 0px;
                                        }
                                        .treetrunk {
                                        fill: brown;
                                        }
                                        .treetop {
                                        fill: green;
                                        }
                                        .ancor {
                                        fill: red;
                                        stroke-width: 0px;
                                        }
                </style>
                """
                + "<g>\n" +
                "    <title>Title</title>\n" +
                "    <rect fill=\"#ffffff\" stroke=\"#000\" stroke-width=\"6\" x=\"220\" y=\"10\" width=\"160\" height=\"40\" id=\"svg_3\"/>\n" +
                "    <text fill=\"#000000\" stroke=\"#000\" x=\"300\" y=\"40\" id=\"svg_1\" font-size=\"24\" font-family=\"Noto Sans JP\" text-anchor=\"middle\" font-weight=\"bold\">\n" +
                topo.getName() +
                "    </text>\n" +
                "  </g>\n" +
                "  <g>\n" +
                "    <title>Disclaimer</title>\n" +
                "    <rect fill=\"white\" stroke-width=\"3\" x=\"5\" y=\"550\" width=\"390\" height=\"45\" stroke=\"black\"/>\n" +
                "    <text stroke=\"#000\" text-anchor=\"middle\" font-family=\"Noto Sans JP\" font-size=\"12\"\n" +
                "          y=\"575\" x=\"200\" stroke-width=\"0\" fill=\"#000000\">\n" +
                "      ⚠\uFE0F⚠\uFE0F⚠\uFE0F This is a generated Topo and is maybe false. ⚠\uFE0F⚠\uFE0F⚠\uFE0F\n" +
                "    </text>\n" +
                "  </g>"
                + getContent(topo.getObstacles(), 400)
                + "</svg>";
    }

    private String getContent(List<DynamoDBObstacle> obstalces, int width) {
        List<PlacableGroup> placeables = obstalces.stream().map(this::toPlacable).toList();
        int x = 0, y = MARGIN_Y;
        for (PlacableGroup pg : placeables) {
            if (x + pg.getSize().getY() > width) y = 0;
            pg.setOffset(new PlacableGroup.Cords(x + MARGIN_X, y));
            x += pg.getSize().getX();
            y += pg.getSize().getY();
        }
        return placeables.stream().map(PlacableGroup::place).collect(Collectors.joining("\n"));
    }

    private PlacableGroup toPlacable(DynamoDBObstacle dynamoDBObstacle) {
        return PlacableGroup.builder()
                .origin(new PlacableGroup.Cords(0, 0))
                .offset(new PlacableGroup.Cords(MARGIN_X, MARGIN_Y))
                .size(sizeOf(dynamoDBObstacle))
                .group(svgOf(dynamoDBObstacle))
                .build();
    }

    private String svgOf(DynamoDBObstacle dynamoDBObstacle) {
        StringBuilder sb = new StringBuilder();
        sb.append(obstacle(dynamoDBObstacle).place());
        details(dynamoDBObstacle).stream().map(PlacableGroup::place).forEach(sb::append);
        return sb.toString();
    }

    private PlacableGroup.Cords sizeOf(DynamoDBObstacle dynamoDBObstacle) {
        return Stream.concat(Stream.of(obstacle(dynamoDBObstacle)), details(dynamoDBObstacle).stream())
                .map(PlacableGroup::getSize)
                .reduce((s, t) -> new PlacableGroup.Cords(s.getX() + t.getX(), s.getY() + t.getY())).get();
    }

    private PlacableGroup obstacle(DynamoDBObstacle obstacle) {

        StringBuilder sb = new StringBuilder();

        sb.append("<path d=\"m0,0");
        switch (obstacle.getType()) {
            case Rappel, Cascade, Jump -> {
                sb.append("c0,0 ");
                sb.append(obstacle.getType().getMinX());
                sb.append(",0 ");
                sb.append(obstacle.getType().getMinX());
                sb.append(",");
                sb.append(obstacle.getType().getMinY());
                sb.append("l0,");
                sb.append(obstacle.getValue() - obstacle.getType().getMinY());
            }
            case Tobogan -> {
                sb.append("c0,0 2,0 2,");
                sb.append(obstacle.getType().getMinY());
                sb.append("l");
                sb.append(obstacle.getValue() - obstacle.getType().getMinX());
                sb.append(",");
                sb.append(obstacle.getValue() - obstacle.getType().getMinY());
                sb.append("l");
                sb.append(obstacle.getType().getMinX() - 2);
                sb.append(",0");
            }
            case Swim, Railing -> {
                sb.append("l");
                sb.append(Math.max(obstacle.getValue(), obstacle.getType().getMinX()));
                sb.append(",");
                sb.append(obstacle.getType().getMinY());
            }
            case Walk -> {
                sb.append("l");
                sb.append(obstacle.getType().getMinX());
                sb.append(",");
                sb.append(obstacle.getType().getMinY());
            }
        }
        sb.append("\"/>");
        sb.append("<text class=\"label\" x=\"");
        sb.append(obstacle.getType().getTextX());
        sb.append("\" y=\"");
        sb.append(obstacle.getType().getTextY());
        sb.append("\">");

        sb.append(switch (obstacle.getType()) {
            case Jump -> "S" + obstacle.getValue();
            case Rappel, Cascade, Tobogan, Descend -> obstacle.getType().name().substring(0, 1) + obstacle.getValue();
            case Railing -> "MC" + obstacle.getValue();
            case Walk, Swim ->
                    obstacle.getValue() > obstacle.getType().getMinX() ? obstacle.getType().name() + " " + obstacle.getValue() + " m" : "";
        });
        sb.append("</text>");
        return PlacableGroup.builder()
                .group(sb.toString())
                .size(switch (obstacle.getType()) {
                    case Rappel, Cascade, Jump, Tobogan, Descend ->
                            new PlacableGroup.Cords(obstacle.getType().getMinX(), Math.max(obstacle.getValue(), obstacle.getType().getMinY()));
                    case Railing, Swim ->
                            new PlacableGroup.Cords(Math.max(obstacle.getValue(), obstacle.getType().getMinX()), obstacle.getType().getMinY());
                    case Walk -> new PlacableGroup.Cords(obstacle.getType().getMinX(), obstacle.getType().getMinY());
                })
                .offset(new PlacableGroup.Cords(0, 0))
                .origin(new PlacableGroup.Cords(0, 0))
                .build();
    }

    private List<PlacableGroup> details(DynamoDBObstacle obstacle) {
        return obstacle.getDetails().stream().map(o -> detail(o, obstacle.getType(), obstacle.getValue())).toList();
    }

    private PlacableGroup detail(DynamoDBDetail extension, Type obstacle, int value) {
        StringBuilder sb = new StringBuilder();
        //int pool radius = extension.getValue();
        sb.append(switch (extension.getType()) {
            case Pool -> "<path d=\"M0,0 C0,5 5,5 5,0 \" class=\"pool\"/>";
            case Rock -> "<path d=\"M0,1 l2,-1 l1,0 l2,1 l0,1 l-2,1 l-1,0 l-2,-1Z\" class=\"rock\"/>";
            case Tree -> """
                    <rect x="2" y="5" width="2" height="5" class="treetrunk"/>
                    <circle cx="3" cy="3" r="3" class="treetop"/>
                    """;
            case Wood -> """
                    <rect width="2" height="7" transform="rotate(45) translate(4.5,-3.5)" class="treetrunk"/>
                    <rect width="2" height="7" transform="rotate(-45) translate(-1.5,1.5)" class="treetrunk"/>
                    """;
            case SingleAncor -> "<circle r=\"1\" class=\"ancor\"/>";
            case TwinAncor -> "<circle r=\"1\" class=\"ancor\"/>" +
                    "<circle cx=\"4\" r=\"1\" class=\"ancor\"/>";
            case ChainAncor -> "<path d=\"m0,0 l4,2\"/>" +
                    "<circle r=\"1\" class=\"ancor\"/>" +
                    "<circle cx=\"4\" cy=\"2\" r=\"1\" class=\"ancor\"/>";
        });
        sb.append("<text class=\"label\" x=\"");
        sb.append(extension.getType().getTextX());
        sb.append("\" y=\"");
        sb.append(extension.getType().getTextY());
        sb.append("\">");
        sb.append(switch (extension.getType()) {
            case SingleAncor, TwinAncor, ChainAncor -> extension.getName();
            default -> "";
        });
        sb.append("</text>");
        return PlacableGroup.builder()
                .group(sb.toString())
                .size(switch (extension.getType()) {
                    case Rock, Tree, Wood, SingleAncor, TwinAncor, ChainAncor -> new PlacableGroup.Cords(0, 0);
                    case Pool -> new PlacableGroup.Cords(5, 0);
                })
                .offset(switch (extension.getType()) {
                    case Pool -> obstacle(DynamoDBObstacle.builder().type(obstacle).value(value).build()).getSize();
                    case SingleAncor, TwinAncor, ChainAncor -> new PlacableGroup.Cords(1, -5);
                    case Rock, Tree, Wood -> new PlacableGroup.Cords(0, 0);
                })
                .origin(new PlacableGroup.Cords(0, 0))
                .build();
    }
}
