
module Common.Data {

  export interface IComponentProperties {
    x: number,
    y: number,
    width?: number,
    height?: number,
    index: number,
    opacity: number
  }

  export interface ILabelProperties extends IComponentProperties {
    text: string,
    fontFamily: string,
    fontWeight: number,
    fontSize: number,
    lineHeight: number,
    justification: string,
    area: boolean,
    fillColor: string
  }

  export interface IRectangleProperties extends IComponentProperties {
    cornerRadius: number,
    fillColor: string,
    borderColor: string,
    borderWidth: number
  }

  export interface IEllipseProperties extends IComponentProperties {
    fillColor: string,
    borderColor: string,
    borderWidth: number
  }

  export interface IArrowProperties extends IComponentProperties {
    start: Drawing.IPoint,
    end: Drawing.IPoint,
    direction: string,
    type: string,
    borderColor: string,
    borderWidth: number
  }

  export interface IMobileDeviceProperties extends IComponentProperties {
    showBar: boolean
  }

  export interface IMobileTitlebarProperties extends IComponentProperties {
    title: string,
    leftIcon: string,
    rightIcon: string
  }

  export interface ITextInputProperties extends IComponentProperties {
    placeholder: String,
    value: String,
    fontSize: number,
    fontWeight: number
  }

  export interface ISelectInputProperties extends IComponentProperties {
    placeholder: String,
    value: String,
    fontSize: number,
    fontWeight: number
  }

  export interface ICheckboxProperties extends IComponentProperties {
    label: String,
    value: Boolean,
    fontSize: number,
    fontWeight: number
  }

  export interface IButtonProperties extends IComponentProperties {
    label: string,
    disabled: boolean,
    fontFamily: string,
    fontWeight: number,
    fontSize: number,
    cornerRadius: number,
    fillColor: string,
    borderColor: string,
    borderWidth: number
  }

  export interface IImageProperties extends IComponentProperties {
    media: Object,
    cornerRadius: number
  }

  export interface IIconProperties extends IComponentProperties {
    icon: string,
    fontSize: number
  }

  export interface IBrowserProperties extends IComponentProperties {
    address: string
  }
}
