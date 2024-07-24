package guide.hammer.canyonista.api.topo.service.impl;

import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;


@ExtendWith(MockitoExtension.class)
class TopoServiceImplTest {
    @InjectMocks
    private TopoServiceImpl service;

    @ParameterizedTest
    @CsvSource(value = {
            "C10,Cascade,10,0",
            "C10u,Cascade,10,1",
            "C10r,Cascade,10,1",
            "C10d,Cascade,10,1",
            "C10rU,Cascade,10,2",
            "C10Ru.,Cascade,10,2",
            "R15,Rappel,15,0",
            "S20u,Jump,20,1",
            "T25U,Tobogan,25,1",
    })
    void decodeObstacleGroup(String input, String type, int value, int details) {
        // assemble
        // act
        var obstacle = service.decodeObstacleGroup(input).get(0);
        assertEquals(value, obstacle.getValue());
        assertEquals(type, obstacle.getType().name());
        assertEquals(details, obstacle.getDetails().size());
    }

    @ParameterizedTest
    @CsvSource(value = {
            "C10,2,1,1",
            "C10 T20u,4,1,2",
            "C10.T20u,3,1,1",
            "C10.T20u,3,1,1",
            "C10.T20u S4u.C12u.C30 W100,8,3,3",
    })
    void getTopoOf(String input, int total, int cascades, int walks) {
        // act
        var topo = service.getTopoOf("", "", input);
        // assert
        assertEquals(total, topo.getObstacles().size());
    }
}