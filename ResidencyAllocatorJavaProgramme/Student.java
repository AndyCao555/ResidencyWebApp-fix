import java.util.ArrayList;
import java.util.List;

// Represents a student with name, choices, score, and assigned interviews
public class Student {
    String name;
    String[] choices;  // Array of company names in order of preference
    double score;
    List<String> interviews = new ArrayList<>();
    int maxInterviews = 3;  // Each student gets 3 interviews

    public Student(String name, String[] choices, double qca, double attendance) {
        this.name = name;
        this.choices = choices;
        this.score = (qca * 0.8) + (attendance * 0.2);
    }

    // Returns true if student has reached their maximum interviews
    public boolean isFullyAssigned() {
        return interviews.size() >= maxInterviews;
    }

    // Returns true if student has no interviews assigned
    public boolean hasNoInterviews() {
        return interviews.isEmpty();
    }
}

