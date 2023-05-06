package com.proiectip.boat.properties;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Document(collection = "properties")
public class Properties {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String idOwner;
    private String name;
    private String location;
    private String description;
    private int noOfRooms;
    private String typeOfProperty;


    public Properties() {
    }

    public Properties(String id, String idOwner, String name, String location, String description, int noOfRooms, String typeOfProperty) {
        this.id = id;
        this.idOwner = idOwner;
        this.name = name;
        this.location = location;
        this.description = description;
        this.noOfRooms = noOfRooms;
        this.typeOfProperty = typeOfProperty;
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

    public String getIdOwner() {
        return idOwner;
    }

    public void setIdOwner(String idOwner) {
        this.idOwner = idOwner;
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
