package com.morfeus.testapplication.temp.element;

import com.morfeus.testapplication.Style;

public abstract class StyleElement extends BaseElement {

    private Style style;

    public StyleElement(String type) {
        super(type);
    }

    public Style getStyle() {
        return style;
    }

    public void setStyle(Style style) {
        this.style = style;
    }
}
