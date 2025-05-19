---
sidebar: false
---

# Operating Systems Scheduling Algorithm Simulator

**Coursework:** Operating Systems (CS4348)
**Tools:** Java, File I/O, Queues, Custom Matrix Visualization

---

## Project Overview

This project simulates two classic CPU scheduling algorithms — **First-Come First-Served (FCFS)** and **Round Robin (RR)** — by reading job data from a tab-separated file and generating text-based visual timelines. It tracks job states over time and prints a visual execution schedule in the terminal.

No libraries or graphics frameworks were used: the simulation relies on standard Java collections, file handling, and custom logic for time-step visualization.

---

## Key Features

* **Dual Scheduling Support**: Simulates both FCFS and Round Robin with a user-defined quantum.
* **Input Flexibility**: Parses job data from a `.txt` file in the format: `JobName  StartTime  Duration`.
* **Matrix-Based Output**: Displays execution progress over time using a 2D array (`char[][]`) as a Gantt-style chart.
* **Execution Tracing**: Clearly marks when each job is active across each scheduling strategy.
* **No External Libraries**: Everything was implemented manually using core Java (`File`, `Scanner`, `Map`, `Queue`, etc.).

---

## Sample Input Format (jobs.txt)

```
A	0	3  
B	2	6  
C	4	4  
D	6	5  
E	8	2  
```

---

## Code Snippet: Job Class & Input Reader

```java
static class Job {
    private String jobName;
    private int startTime;
    private int duration;

    public Job(String jobName, int startTime, int duration) {
        this.jobName = jobName;
        this.startTime = startTime;
        this.duration = duration;
    }
    // Getters omitted for brevity
}

private static List<Job> readData(String filename) {
    List<Job> jobList = new ArrayList<>();
    try (Scanner scanner = new Scanner(new File(filename))) {
        while (scanner.hasNextLine()) {
            String[] data = scanner.nextLine().split("\t");
            jobList.add(new Job(data[0], Integer.parseInt(data[1]), Integer.parseInt(data[2])));
        }
    } catch (FileNotFoundException e) {
        System.err.println("File not found: " + filename);
        System.exit(1);
    }
    return jobList;
}
```

---

## FCFS Implementation

```java
private static void fcfsSchedule(List<Job> jobs) {
    int maxTime = jobs.stream().mapToInt(j -> j.getDuration()).sum();
    char[][] schedule = new char[maxTime][jobs.size()];
    Queue<Job> queue = new LinkedList<>(jobs);
    Map<Job, Integer> executed = new HashMap<>();
    int currentTime = 0;

    while (!queue.isEmpty()) {
        Job job = queue.poll();
        int jobIndex = job.getJobName().charAt(0) - 'A';
        int start = Math.max(job.getStartTime(), currentTime);

        for (int t = start; t < start + job.getDuration(); t++) {
            if (t < schedule.length) schedule[t][jobIndex] = 'X';
        }

        currentTime = start + job.getDuration();
    }

    printSchedules(schedule, jobs);
}
```

---

## Round Robin Implementation

```java
private static void roundRobinSchedule(List<Job> jobs, int quantum) {
    int maxTime = jobs.stream().mapToInt(Job::getDuration).sum() + jobs.size();
    char[][] schedule = new char[maxTime][jobs.size()];
    Queue<Job> queue = new LinkedList<>(jobs);
    Map<Job, Integer> executed = new HashMap<>();
    int currentTime = 0;

    jobs.forEach(job -> executed.put(job, 0));

    while (!queue.isEmpty()) {
        Job job = queue.peek();
        if (job.getStartTime() > currentTime) {
            currentTime = job.getStartTime();
            continue;
        }

        queue.poll(); // Ready to execute
        int remaining = job.getDuration() - executed.get(job);
        int slice = Math.min(quantum, remaining);
        int jobIndex = job.getJobName().charAt(0) - 'A';

        for (int t = currentTime; t < currentTime + slice; t++) {
            if (t < schedule.length) schedule[t][jobIndex] = 'X';
        }

        executed.put(job, executed.get(job) + slice);
        currentTime += slice;

        if (executed.get(job) < job.getDuration()) queue.add(job);
    }

    printSchedules(schedule, jobs);
}
```

---

## Output Visualization (Console-Based)

### Example:

```
A B C D E
X
X
X
   X
   X
   X
   X
   X
   X
      X
      X
      X
      X
         X
         X
         X
         X
         X
            X
            X
```

---

## Technical Constraints

* ✅ No GUI or visual libraries — all output was ASCII-rendered
* ✅ No scheduling frameworks or Java concurrency
* ✅ Manual control of time simulation, matrix handling, and job queue logic
* ❌ No external dependencies

---

## Key Takeaways

* Learned to manually simulate **time-step driven CPU scheduling**
* Reinforced algorithm behavior differences (sequential FCFS vs. fair-share RR)
* Practiced building **custom visual output systems** using arrays
* Gained confidence in **queue-based scheduling logic** and **job tracking**

---