package guide.hammer.canyonista.api.topo.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PlacableGroup {
    private String group;
    private Cords size;
    private Cords offset; // To Canvas
    private Cords origin; // Zero point in group ex. center of circle

    @Data
    @AllArgsConstructor
    public static class Cords {
        int x, y;
    }

    public String place() {
        StringBuilder sb = new StringBuilder();
        sb.append("<g transform=\"translate(" + (origin.x + offset.x) + "," + (origin.y + offset.y) + ")\">");
        sb.append(group);
        sb.append("</g>");
        return sb.toString();
    }
}
