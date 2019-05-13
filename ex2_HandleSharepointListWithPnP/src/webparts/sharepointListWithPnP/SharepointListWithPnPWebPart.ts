import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'SharepointListWithPnPWebPartStrings';
import SharepointListWithPnP from './components/SharepointListWithPnP';
import { ISharepointListWithPnPProps } from './components/ISharepointListWithPnPProps';

export interface ISharepointListWithPnPWebPartProps {
  ListUrl: string;
}

export default class SharepointListWithPnPWebPart extends BaseClientSideWebPart<ISharepointListWithPnPWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISharepointListWithPnPProps> = React.createElement(
      SharepointListWithPnP,
      {
        ListUrl: this.properties.ListUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('ListUrl', {
                  label: strings.ListUrlField
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
