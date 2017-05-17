package com.morfeus.testapplication.temp.element;

public class SubTitleElement extends StyleElement {
    private String subTitle;

    public SubTitleElement(String type) {
        super(type);
    }

    public String getSubTitle() {
        return subTitle;
    }

    public void setSubTitle(String subTitle) {
        this.subTitle = subTitle;
    }
}
