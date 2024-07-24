package guide.hammer.canyonista.api.topo.service;

import guide.hammer.canyonista.api.topo.model.DynamoDBTopo;

public interface TopoSvgService {

    String getTopoOf(DynamoDBTopo topo);

}
