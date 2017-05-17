package com.morfeus.testapplication.temp.element;

public class ButtonElement extends StyleElement {

    private String text;

    private String action;

    private String payload;

    public ButtonElement(String type) {
        super(type);
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getPayload() {
        return payload;
    }

    public void setPayload(String payload) {
        this.payload = payload;
    }
}
