package guide.hammer.canyonista.api.topo.model;


import lombok.*;
import software.amazon.awssdk.enhanced.dynamodb.extensions.annotations.DynamoDbVersionAttribute;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSecondaryPartitionKey;

import java.util.List;
import java.util.Map;

@DynamoDbBean
@Data
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DynamoDBTopo {
    @Getter(onMethod_ = @DynamoDbPartitionKey)
    private String id;
    @Getter(onMethod_ = @DynamoDbVersionAttribute)
    private Integer version;
    private Map<String, String> ids;
    @Getter(onMethod_ = @DynamoDbSecondaryPartitionKey(indexNames = "by_name"))
    private String name;
    private DynamoDBPlaceableImage start;
    private List<DynamoDBObstacle> obstacles;
    private DynamoDBPlaceableImage exit;
}
