package com.morfeus.testapplication.temp.element;

public class TitleElement extends StyleElement {

    private String title;

    public TitleElement(String type) {
        super(type);
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
