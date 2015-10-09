/// <reference path="../../../../typings/paper/paper.d.ts"/>
/// <reference path="../../../higherframe.ts"/>

module Higherframe.Drawing.Component.Library {

  export class Label extends Drawing.Component.Base implements Drawing.Component.IComponent {

    // Implement IDefinition members
    id = Drawing.Component.Type.Label;
    static title = 'Label';
    static preview = '/assets/images/components/iphone.svg';
    static category = 'Basic';
    tags = [
      'basic',
      'text',
      'label',
      'string'
    ];
    properties = [
      {
        label: 'Text',
        model: 'text',
        type: String,
        description: 'Set the text in the label.'
      },
      {
        label: 'Font size',
        model: 'fontSize',
        type: Number,
        description: 'Set the font size of the input.'
      }
    ];
    resizable = false;
    showBounds = false;

    model: Data.Component;


    /**
     * Create a new Label component
     */

    constructor(model: Data.IDrawingModel) {

      super(model);

      var properties = this.getProperties();
      properties.text = 'Label';
      properties.fontSize = properties.fontSize || 14;

      // Perform the initial draw
      this.update();
    }


    /**
     * Redraw the component
     */

    update() {

      var properties = this.getProperties();

      // Remove the old parts
      this.removeChildren();

      // Draw the text
      var value = new paper.PointText({
        point: new paper.Point(properties.x, properties.y + properties.fontSize/3),
        content: properties.text,
        fillColor: 'black',
        fontSize: properties.fontSize,
        fontFamily: 'Myriad Pro'
      });
      this.addChild(value);
    }

    /**
     * Update model with the state of the view component
     */

    updateModel() {

      this.model.properties.x = this.position.x;
      this.model.properties.y = this.position.y;
    }


    /**
     * Calculate the snap points for the component
     */

    getSnapPoints(): Array<IPoint> {

      var snapPoints = [];
      var properties = this.getProperties();

      // Corners
      /*snapPoints.push(this.position.add(new paper.Point({ x: -(width/2), y: -(height/2) })));
      snapPoints.push(this.position.add(new paper.Point({ x: (width/2), y: -(height/2) })));
      snapPoints.push(this.position.add(new paper.Point({ x: (width/2), y: (height/2) })));
      snapPoints.push(this.position.add(new paper.Point({ x: -(width/2), y: (height/2) })));*/

      return snapPoints;
    }


    /**
     * Calculate the drag points for the component
     */

    getDragHandles(): Array<IDragHandle> {

      return [];
    }


    /**
     * Cast the model properties into the correct type
     */

    getProperties(): Higherframe.Data.ILabelProperties {

      return <Higherframe.Data.ILabelProperties>this.model.properties;
    }
  }
}
