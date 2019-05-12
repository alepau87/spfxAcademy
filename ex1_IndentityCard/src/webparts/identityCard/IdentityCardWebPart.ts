import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';
import { IDateTimeFieldValue, PropertyFieldDateTimePicker, DateConvention, TimeConvention } from '@pnp/spfx-property-controls/lib/PropertyFieldDateTimePicker';
import * as strings from 'IdentityCardWebPartStrings';
import IdentityCard from './components/IdentityCard';
import { IIdentityCardProps } from './components/IIdentityCardProps';
import { string } from 'prop-types';

export interface IIdentityCardWebPartProps {
  nome: string;
  cognome: string;
  luogoNascita: string;
  dataNascita: IDateTimeFieldValue;
  sesso: string;
  foto: string;
}

export default class IdentityCardWebPart extends BaseClientSideWebPart<IIdentityCardWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IIdentityCardProps> = React.createElement(
      IdentityCard,
      {
        nome: this.properties.nome,
        cognome: this.properties.cognome,
        luogoNascita: this.properties.luogoNascita,
        dataNascita: this.properties.dataNascita != undefined ? this.properties.dataNascita.value : null,
        sesso: this.properties.sesso,
        foto: this.properties.foto
      }
    );

    ReactDom.render(element, this.domElement);
    this.HandleButtonClick();

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
                PropertyPaneTextField('nome', {
                  label: strings.nameLabel
                }),
                PropertyPaneTextField('cognome', {
                  label: strings.surnameLabel
                }),
                PropertyPaneTextField('luogoNascita', {
                  label: strings.birthPlaceLabel
                }),
                PropertyFieldDateTimePicker('dataNascita', {
                  label: strings.birthDateLabel,
                  initialDate: this.properties.dataNascita,
                  dateConvention: DateConvention.Date,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  onGetErrorMessage: null,
                  key: 'dataNascitaId'
                }),
                PropertyPaneDropdown('sesso', {
                  label: strings.genderLabel,
                  options: [{ key: 'Maschio', text: 'M' }, { key: 'Femmina', text: 'F' }]
                }),
                PropertyPaneTextField('foto', {
                  label: strings.fotoLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private GetLifeDays(): any {
    if (this.properties.dataNascita != null) {
      var _MS_PER_DAY = 1000 * 60 * 60 * 24;
      var today = new Date();
      var birthDate = new Date(this.properties.dataNascita.value as any);
      var utcBirth = Date.UTC(birthDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
      var utcToday = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
      var _numberOfDays = Math.floor((utcToday - utcBirth) / _MS_PER_DAY).toString();
      document.getElementById('LifeDaysSpan') != undefined ? document.getElementById('LifeDaysSpan').textContent = _numberOfDays : "";
    }
    else {
      alert("Inserire la data di nascita!!");
    }
  }

  private HandleButtonClick() {
    document.getElementById("GetNumbersButton").removeEventListener('click', () => { console.log("Event click disabled") });
    document.getElementById("GetNumbersButton").addEventListener('click', () => {
      this.GetLifeDays();
    });
  }

}
