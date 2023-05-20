package com.proiectip.boat.properties;
import com.proiectip.boat.owners.Owners;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Document(collection = "properties")
public class Properties {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String owner;
    private String name;
    private String location;
    private String description;
    private int noOfRooms;
    private String typeOfProperty;

    public Properties(String owner,String name, String location, String description, int noOfRooms, String typeOfProperty) {
        this.owner = owner;
        this.name = name;
        this.location = location;
        this.description = description;
        this.noOfRooms = noOfRooms;
        this.typeOfProperty = typeOfProperty;
    }

    public String getOwner() {
        return this.owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getId() {
        return id;
    }

    public void setIdProperty(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getNoOfRooms() {
        return noOfRooms;
    }

    public void setNoOfRooms(int noOfRooms) {
        this.noOfRooms = noOfRooms;
    }

    public String getTypeOfProperty() {
        return typeOfProperty;
    }

    public void setTypeOfProperty(String typeOfProperty) {
        this.typeOfProperty = typeOfProperty;
    }

    public String getPropertyDetails() {
        return "Property{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", location='" + location + '\'' +
                ", description='" + description + '\'' +
                ", noOfRooms=" + noOfRooms +
                ", typeOfProperty='" + typeOfProperty + '\'' +
                '}';
    }
}
