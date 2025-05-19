---
sidebar: false
---
# Melody MoodSync - A Music Recommendation Database System 
**Team Members:** Lemuel Amouh, Yousuf Stanikzay, Lamisa Tahseen, Courtney Dickenson, Angelina John, Jahnavi Dhulipalla, Jack Hoggard, Jalay Shukla, Preston Hearn

**Role:** Schema Design, SQL Query Implementation, Feature Integration  
**Tools:** MySQL, Python, Flask, HTML/CSS, Bootstrap  
**Repository:** [GitHub - Song-Database-CS4347-005](https://github.com/JacksonHoggard/Song-Database-CS4347-005)

---

## Project Overview  
This group project was developed as part of the CS4347: Database Systems course at the University of Texas at Dallas. The objective was to design and implement a **fully normalized relational database** for managing song and artist data, with a functioning **web application interface**.

The system allowed users to **browse, search, and manipulate music-related data**, all while adhering to core database principles like **data integrity, normalization**, and **multi-table relationships**.

### Key Features:  
- **Normalized SQL Schema** – Designed to 3NF with foreign keys linking all major entities  
- **Relational Queries** – JOINs and nested queries for advanced lookups  
- **Flask Web Interface** – Simple frontend to test key routes and endpoints  
- **Admin Controls** – Insert, delete, and update song, artist, album, and genre data  

<!-- ![ER Diagram](./assets/song_database_er.png) -->

---

## Database Schema  
```sql
CREATE TABLE Artists (
    ArtistID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL
);

CREATE TABLE Albums (
    AlbumID INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(100),
    ArtistID INT,
    FOREIGN KEY (ArtistID) REFERENCES Artists(ArtistID)
);

CREATE TABLE Genres (
    GenreID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100)
);

CREATE TABLE Songs (
    SongID INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(100),
    AlbumID INT,
    GenreID INT,
    Duration TIME,
    FOREIGN KEY (AlbumID) REFERENCES Albums(AlbumID),
    FOREIGN KEY (GenreID) REFERENCES Genres(GenreID)
);
```

---

## Application Features  
### Song Browser  
Users can view a list of all songs, sorted by artist, album, or genre.  

### Search by Keyword  
Supports search across multiple fields like artist name, song title, and album.  

### Insert New Songs  
Admins can add new entries directly through a simple web form.

```python
@app.route('/add_song', methods=['POST'])
def add_song():
    title = request.form['title']
    album_id = request.form['album_id']
    genre_id = request.form['genre_id']
    duration = request.form['duration']
    cursor = conn.cursor()
    cursor.execute("INSERT INTO Songs (Title, AlbumID, GenreID, Duration) VALUES (%s, %s, %s, %s)",
                   (title, album_id, genre_id, duration))
    conn.commit()
    return redirect('/songs')
```

---

## Challenges and Solutions  
### 1. Multi-Table Insert Logic  
**Issue:** Needed to maintain foreign key consistency across artist, album, and song.  
**Solution:** Structured forms in Flask to insert parent rows first, fetch their IDs, and then insert dependent records.

### 2. Frontend Validation  
**Issue:** Poor form inputs caused backend SQL failures.  
**Solution:** Added `required` fields in HTML forms and backend exception handling.

### 3. Query Optimization  
**Issue:** Some filters ran slowly during testing.  
**Solution:** Added indexes on `GenreID` and `AlbumID`, reduced unnecessary joins.

---

## Future Enhancements  
- Implement login system with role-based access (admin/user)  
- Add API routes for frontend-independent integration  
- Improve UI responsiveness using JavaScript or React frontend  

---

## Key Takeaways  
- Learned how to design a normalized relational database schema from scratch  
- Practiced multi-table SQL queries and form integration with Flask  
- Gained real-world teamwork experience coordinating backend logic with frontend testing  

---
