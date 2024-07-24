package guide.hammer.canyonista.api.topo.controller;

import guide.hammer.canyonista.api.topo.repo.DynamoDBRepo;
import guide.hammer.canyonista.api.topo.service.TopoService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class DataController {
    private final DynamoDBRepo repo;
    private final TopoService topoService;
    @Operation(summary = "parses a string and generates a topo", tags = "Data")
    @GetMapping("/get/topo")
    @ResponseBody
    public String toTopo(String name, String href, String quickTopoEntry) {
        return topoService.getSVGOf(name, href, quickTopoEntry);
    }
    @Operation(summary = "returns list of all canyons", tags = "Data")
    @GetMapping("/create/table")
    public void createTable(){
        repo.createTable();
    }
}
