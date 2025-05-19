---
sidebar: false
---

# Doctor’s Office Simulation

**Coursework:** Concurrent Programming in Java
**Tools:** Core Java (Threads, Semaphores Only)

---

## Project Overview

This simulation models a realistic clinic environment where patients interact with receptionists, nurses, and doctors. Each role is implemented as a separate thread, and synchronization is managed using semaphores to control access to limited resources (e.g., waiting room chairs, exam rooms).

Designed without any high-level concurrency abstractions or third-party libraries, this project reinforces a fundamental understanding of thread coordination, resource gating, and deadlock avoidance.

---

## Key Features

* **Threaded Agents**: Separate `Thread` instances simulate patients, doctors, nurses, and a receptionist.
* **Semaphore Coordination**: Ensures correct sequencing and access limits without race conditions.
* **Scalable Runtime Parameters**: The number of doctors and patients is set via command-line.
* **Clean Lifecycle Logging**: Tracks each patient’s journey and internal synchronization in the terminal.

---

## How It Works

### System Setup

```java
// Resource limits
static Semaphore maxCapacity;        // Max number of patients in clinic
static Semaphore checkIn = new Semaphore(1, true); 
static Semaphore waitingRoomChair;   // Simulate finite waiting area
static Semaphore office;             // Exam rooms = number of doctors
static Semaphore patientReady = new Semaphore(0, true); 
static Semaphore checkUp = new Semaphore(0, true); 
static Semaphore drFinished = new Semaphore(0, true); 

public static void main(String[] args) {
    int numberOfDoctors = Integer.parseInt(args[0]);
    patientCount = Integer.parseInt(args[1]);

    maxCapacity = new Semaphore(patientCount, true);
    waitingRoomChair = new Semaphore(patientCount, true);
    office = new Semaphore(numberOfDoctors, true);

    // Start receptionist
    Thread receptionistThread = new Thread(() -> receptionist());
    receptionistThread.start();

    // Start doctor and nurse threads
    for (int i = 0; i < numberOfDoctors; i++) {
        final int id = i;
        new Thread(() -> doctor(id)).start();
        new Thread(() -> nurse(id)).start();
    }

    // Start patient threads
    for (int i = 0; i < patientCount; i++) {
        final int id = i;
        new Thread(() -> patient(id)).start();
    }
}
```

---

### Patient Thread

```java
public static void patient(int id) {
    try {
        maxCapacity.acquire(); // enter clinic
        waitingRoomChair.acquire(); 
        System.out.println("Patient " + id + " enters and waits.");

        checkIn.acquire();
        System.out.println("Receptionist registers patient " + id);
        checkIn.release();

        System.out.println("Patient " + id + " waits for nurse.");
        patientReady.release(); // tell nurse we're ready
        waitingRoomChair.release();

        office.acquire(); // wait for exam room
        drFinished.acquire(); // wait for doctor to finish
        System.out.println("Patient " + id + " leaves clinic.");
        office.release();
        maxCapacity.release();
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
}
```

---

### Receptionist Thread

```java
public static void receptionist() {
    try {
        while (maxCapacity.availablePermits() > 0 && patientReady.availablePermits() > 0) {
            checkIn.acquire(); 
            System.out.println("Receptionist has checked in a patient.");
            checkIn.release(); 
        }
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
}
```

---

### Nurse Thread

```java
public static void nurse(int id) {
    try {
        while (true) {
            patientReady.acquire(); 
            System.out.println("Nurse " + id + " prepares patient.");
            checkUp.release(); // alert doctor
        }
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
}
```

---

### Doctor Thread

```java
public static void doctor(int id) {
    try {
        while (true) {
            checkUp.acquire(); // wait for nurse signal
            System.out.println("Doctor " + id + " performs checkup.");
            drFinished.release(); // notify patient we're done
        }
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
}
```

---

## Technical Constraints

This simulation was developed with strict limitations:

* ❌ No use of libraries like `Executors`, `Future`, or UI frameworks
* ✅ Manual management using `Thread` and `Semaphore` from Java’s standard library
* ✅ All scheduling, signaling, and resource limits implemented from scratch

These constraints encouraged low-level problem solving and gave full control over thread behavior and deadlock prevention.

---

## Key Takeaways

* Built a **synchronized multi-agent system** from first principles
* Practiced **resource arbitration** under capacity constraints
* Strengthened knowledge of **inter-thread communication patterns**
* Gained real-world insight into **producer-consumer** dynamics in scheduling problems

---

