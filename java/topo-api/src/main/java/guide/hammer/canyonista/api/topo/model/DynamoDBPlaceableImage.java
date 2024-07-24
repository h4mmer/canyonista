package guide.hammer.canyonista.api.topo.model;


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
public class DynamoDBPlaceableImage {
    @Getter(onMethod_ = @DynamoDbPartitionKey)
    private String id;
    @Getter(onMethod_ = @DynamoDbVersionAttribute)
    private Integer version;
    private String value;
}
