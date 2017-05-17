package com.morfeus.testapplication.temp.element;

public abstract class BaseElement {

    private String type;

    public BaseElement(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
