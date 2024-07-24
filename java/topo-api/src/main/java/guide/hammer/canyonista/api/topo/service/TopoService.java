package guide.hammer.canyonista.api.topo.service;

import guide.hammer.canyonista.api.topo.model.DynamoDBTopo;

public interface TopoService {

    DynamoDBTopo getTopoOf(String name, String href, String quickTopoEntry);

    String getSVGOf(String name, String href, String quickTopoEntry);

}
