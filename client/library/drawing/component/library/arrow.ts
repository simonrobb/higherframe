/// <reference path="../../../../typings/paper/paper.d.ts"/>
/// <reference path="../../../higherframe.ts"/>

module Higherframe.Drawing.Component.Library {

  export class Arrow extends Drawing.Component.Base implements Drawing.Component.IComponent {

    // Implement IDefinition members
    id = Drawing.Component.Type.Arrow;
    static title = 'Arrow';
    static preview = '/assets/images/components/arrow.svg';
    static category = 'Basic';
    tags = [
      'basic',
      'line',
      'flowchart'
    ];
    properties = [
      {
        label: 'Direction',
        controls: [
          {
            model: 'direction',
            type: String,
            ui: 'select',
            options: [
              {
                label: 'None',
                value: ''
              },
              {
                label: 'Left',
                value: 'left'
              },
              {
                label: 'Right',
                value: 'right'
              },
              {
                label: 'Both',
                value: 'both'
              }
            ],
            description: 'Set which ends of the line should have an arrow head.'
          }
        ]
      },
      {
        label: 'Type',
        controls: [
          {
            model: 'type',
            type: String,
            ui: 'select',
            options: [
              {
                label: 'Straight',
                value: 'straight'
              },
              {
                label: 'Curve',
                value: 'curve'
              },
              {
                label: 'Double curve',
                value: 'dcurve'
              },
              {
                label: 'Angle',
                value: 'angle'
              },
              {
                label: 'Crank',
                value: 'crank'
              },
              {
                label: 'Double crank',
                value: 'dcrank'
              },
            ]
          }
        ]
      }
    ];
    resizable = true;
    showBounds = false;
    thumbnail = '/assets/images/components/iphone-thumbnail@2x.png';
    snapPoints = [
      { x: -116, y: -232 },		// Bounding box
      { x: 116, y: -232 }
    ];

    model: Data.Component;


    /**
     * Create a new Arrow component
     */

    constructor(model: Data.IDrawingModel) {

      super(model);

      var properties = <Higherframe.Data.IArrowProperties>(model.properties);
      properties.start = properties.start || new paper.Point(properties.x - 100, properties.y);
      properties.end = properties.end || new paper.Point(properties.x + 100, properties.y);
      properties.direction = properties.direction || 'right';
      properties.type = properties.type || 'straight';

      // Perform the initial draw
      this.update();
    }


    /**
     * Perform any necessary transformation on the component when saving
     */

    serialize(): Data.Component {

      var model = angular.copy(this.model);

      // Transform paper.Points into relevant data
      var properties = <Higherframe.Data.IArrowProperties>model.properties;
      properties.start = {
        x: properties.start.x,
        y: properties.start.y
      };

      properties.end = {
        x: properties.end.x,
        y: properties.end.y
      };

      return model;
    }


    /**
     * Redraw the component
     */

    update() {

      // Determine palette
      var theme: Higherframe.UI.ITheme = new Higherframe.UI.DefaultTheme();
      var foreColor = this.collaborator ? new paper.Color(this.collaborator.color) : theme.ComponentDefault;

      if (this.active) {

        foreColor = theme.ComponentActive;
      }

      else if (this.focussed) {

        foreColor = theme.ComponentFocus;
      }

      else if (this.hovered) {

        foreColor = theme.ComponentHover;
      }

      var properties = <Higherframe.Data.IArrowProperties>this.model.properties;

      // Remove the old parts
      this.removeChildren();

      var start = new paper.Point(properties.start);
      var end = new paper.Point(properties.end);
      var startRotation: number;
      var endRotation: number;

      // Draw the line
      var line = new paper.Path();
      line.add(start);

      switch(properties.type) {

        case 'straight':
          startRotation = -90 + end.subtract(start).angle;
          endRotation = 90 + end.subtract(start).angle;
          break;

        case 'crank':

          var mid = new paper.Point(properties.start.x, properties.end.y);
          line.add(mid);
          startRotation = 180 + end.subtract(mid).angle;
          endRotation = 180 + mid.subtract(start).angle;
          break;

        case 'dcrank':

          var midOne = new paper.Point(properties.start.x + 50, properties.start.y);
          var midTwo = new paper.Point(properties.start.x + 50, properties.end.y);

          line.add(midOne);
          line.add(midTwo);

          startRotation = -90 + end.subtract(midTwo).angle;
          endRotation = 90 + midOne.subtract(start).angle;
          break;
      }

      line.add(end);
      line.strokeColor = foreColor;
      line.strokeWidth = 1.5;
      this.addChild(line);

      // Draw the heads
      if (properties.direction == 'left' || properties.direction == 'both') {

        var startHead = paper.Path.RegularPolygon(start.add(new paper.Point(0,5)), 3, 6);
        startHead.fillColor = foreColor;
        startHead.rotate(startRotation, start);
        this.addChild(startHead);
      }

      if (properties.direction == 'right' || properties.direction == 'both') {

        var endHead = paper.Path.RegularPolygon(end.add(new paper.Point(0,5)), 3, 6);
        endHead.fillColor = foreColor;
        endHead.rotate(endRotation, end);
        this.addChild(endHead);
      }
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

      var properties = <Higherframe.Data.IArrowProperties>this.model.properties;

      return [
        properties.start,
        properties.end
      ];
    }


    /**
     * Calculate the drag handles for the component
     */

    getDragHandles(): Array<IDragHandle> {

      var properties = <Higherframe.Data.IArrowProperties>this.model.properties;

      var start = new DragHandle(new paper.Point(properties.start));
      start.cursor = Cursors.ResizeNESW;
      start.onMove = (position: paper.Point): paper.Point => {

        properties.start = position;
        this.update();

        return position;
      };

      var end = new DragHandle(new paper.Point(properties.end));
      end.cursor = Cursors.ResizeNESW;
      end.onMove = (position: paper.Point): paper.Point => {

        properties.end = position;
        this.update();

        return position;
      };

      return [start, end];
    }
  }
}
