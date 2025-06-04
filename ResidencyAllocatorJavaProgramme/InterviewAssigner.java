import java.util.*;

public class InterviewAssigner {
    public static void main(String[] args) {
        // The importance of scores and how it can effect you
        Student[] students = {
            new Student("Alice", new String[]{"Google", "AWS", "Intercom", "Stripe", "Analog", "UCC", "DogPatch"}, 4.0, 99),
            new Student("Bob", new String[]{"Google", "AWS", "Intercom", "Stripe", "Analog", "UCC", "DogPatch"}, 3.7, 84),
            new Student("Carol", new String[]{"Google", "AWS", "Intercom", "Stripe", "Analog", "UCC", "DogPatch"}, 3.4, 96),
            new Student("Dave", new String[]{"Google", "AWS", "Intercom", "Stripe", "Analog", "UCC", "DogPatch"}, 3.5, 82),
            new Student("Eve", new String[]{"Google", "AWS", "Intercom", "Stripe", "Analog", "DogPatch", "UCC"}, 3.0, 73),
            new Student("Frank", new String[]{"Intercom", "Stripe", "Google", "AWS", "Analog", "UCC", "DogPatch"}, 2.8, 71),
            new Student("Harry", new String[]{"Intercom", "Stripe", "Google", "AWS", "Analog", "UCC", "DogPatch"}, 2.4, 48)
            //, new Student("Mike", new String[]{"McDonalds","Burger King"}, 2.5, 75)
        };

        Company[] companies = {
            new Company("Google"),
            new Company("AWS"),
            new Company("Intercom"),
            new Company("Stripe"),
            new Company("Analog"),
            new Company("UCC"),
            new Company("DogPatch"),
            new Company("McDonalds"),
            new Company("Burger King")
        };


        // Sorts students in descending order using a lambda funcion
        Arrays.sort(students, (a, b) -> Double.compare(b.score, a.score));


        // Loop through the students and their choices
        for (Student student : students) {
            for (String choice : student.choices) {
                if (student.isFullyAssigned()) break; // This ends the loop as the students interviews are assigned
                Company company = findCompany(companies, choice); // object reference
                if (company != null && company.students.size() < company.maxInterviews) {
                    company.students.add(student);
                    student.interviews.add(company.name);
                }
            }
        }

        // This fills in students who still need companies after the first loop
        for (Student student : students) {
            if (!student.isFullyAssigned()) {
                for (Company company : companies) {
                    if (student.isFullyAssigned()) break;

                    // Checking if the student isnt already assigned to a company and if they dont have enough
                    if (!student.interviews.contains(company.name) && company.students.size() < company.maxInterviews) {
                        company.students.add(student);
                        student.interviews.add(company.name);
                    }
                }
            }
        }

        // --- Print results ---
        System.out.println("Student Assignments:");
        for (Student student : students) {
            System.out.printf("%s (Score: %.2f) -> %s%n", student.name, student.score, student.interviews);

        }

        System.out.println("\nCompany Assignments:");
        for (Company company : companies) {
            System.out.println(company.name + ": " + company.students.size() + "/" +
                    company.maxInterviews + " " +
                    company.students.stream().map(s -> s.name).toList());
        } // Functional interface which maps every student to a name.
    }
    // Helper to find a company by name and make it an object
    static Company findCompany(Company[] companies, String name) {
        for (Company c : companies) if (c.name.equals(name)) return c;
        return null; //  If no company in the array matches the given name, it wont return anything
    }
}




