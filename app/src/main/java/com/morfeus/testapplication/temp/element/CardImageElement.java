package com.morfeus.testapplication.temp.element;

public class CardImageElement extends BaseElement {

    private String imageType;

    private String imageName;

    private String url;

    public CardImageElement(String type) {
        super(type);
    }

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
