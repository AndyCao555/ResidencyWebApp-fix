import java.util.ArrayList;
import java.util.List;

// Represents a company with name, max interviews, and assigned students
public class Company {
    String name;
    int maxInterviews = 3;
    List<Student> students = new ArrayList<>();

    public Company(String name) {
        this.name = name;
    }
}



