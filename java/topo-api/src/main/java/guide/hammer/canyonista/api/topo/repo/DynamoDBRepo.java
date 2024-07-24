package guide.hammer.canyonista.api.topo.repo;

import guide.hammer.canyonista.api.topo.model.DynamoDBTopo;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Log4j2
public class DynamoDBRepo {

    private final DynamoDbEnhancedClient enhancedClient;
    private final DynamoDbClient dynamoDbClient;

    private DynamoDbTable<DynamoDBTopo> getTable() {
        return enhancedClient.table("topos", TableSchema.fromBean(DynamoDBTopo.class));
    }

    public Optional<DynamoDBTopo> findById(String id) {
        return Optional.ofNullable(getTable().getItem(Key.builder().partitionValue(id).build()));
    }

    public void save(DynamoDBTopo topo) {
        if (topo.getId() == null)
            topo.setId(UUID.randomUUID().toString());
        getTable().putItem(topo);
    }
    public void createTable(){
        getTable().createTable();
    }
}
