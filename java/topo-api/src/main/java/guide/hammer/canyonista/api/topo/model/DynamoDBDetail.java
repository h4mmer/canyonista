package guide.hammer.canyonista.api.topo.model;


import guide.hammer.canyonista.db.enums.ObstacleExtensionType;
import lombok.*;
import software.amazon.awssdk.enhanced.dynamodb.extensions.annotations.DynamoDbVersionAttribute;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;

@DynamoDbBean
@Data
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DynamoDBDetail {
    @Getter(onMethod_ = @DynamoDbPartitionKey)
    private String id;
    @Getter(onMethod_ = @DynamoDbVersionAttribute)
    private Integer version;

    private String name;
    private ObstacleExtensionType type;
    private int value;
    private int offsetX, offsetY;
}
