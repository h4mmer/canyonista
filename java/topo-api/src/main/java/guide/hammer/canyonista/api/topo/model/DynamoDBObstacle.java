package guide.hammer.canyonista.api.topo.model;


import guide.hammer.canyonista.db.enums.Style;
import guide.hammer.canyonista.db.enums.Type;
import lombok.*;
import software.amazon.awssdk.enhanced.dynamodb.extensions.annotations.DynamoDbVersionAttribute;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;

import java.util.List;

@DynamoDbBean
@Data
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DynamoDBObstacle {
    @Getter(onMethod_ = @DynamoDbPartitionKey)
    private String id;
    @Getter(onMethod_ = @DynamoDbVersionAttribute)
    private Integer version;

    private String name;
    private Type type;
    private Style style;
    private int value;
    private List<DynamoDBDetail> details;
}
