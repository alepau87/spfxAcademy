import * as React from 'react';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, PrimaryButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import styles from './RequestHolidays.module.scss';
import { IRequestHolidaysProps } from './IRequestHolidaysProps';
import { escape } from '@microsoft/sp-lodash-subset';


export interface IRequestState {

  Nome: string;
  Cognome: string;
  User: string;
  Inizio: string;
  Fine: string;
}




export default class RequestHolidays extends React.Component<IRequestHolidaysProps, IRequestState> {



  constructor(contextProps: IRequestHolidaysProps) {
    super(contextProps);

    this.state = { Nome: "", Cognome: "", User: "", Inizio: "", Fine: "" };

  }


  public render(): React.ReactElement<IRequestHolidaysProps> {
    return (
      <div>
        <div className={styles.requestHolidays}>
          <TextField label="Nome" required onChange={this._getNome} />
          <TextField label="Cognome" required onChange={this._getCognome} />
          <TextField label="UserName" required onChange={this._getUser} />
          <MaskedTextField label="Data Inizio Ferie" mask="99/99/9999" onChange={this._getInizio} />
          <MaskedTextField label="Data Inizio Ferie" mask="99/99/9999" onChange={this._getFine} />
        </div>
        <div className={styles.divButton}>
          <PrimaryButton
            data-automation-id="submit"
            text="Submit"
            onClick={() => {this.submitRequest();}}
          />
        </div>
      </div>
    );
  }



  private _getNome = (ev: React.FormEvent<HTMLInputElement>, newValue?: string) => {
    this.setState({ Nome: newValue })
  }
  private _getCognome = (ev: React.FormEvent<HTMLInputElement>, newValue?: string) => {
    this.setState({ Cognome: newValue })
  }
  private _getUser = (ev: React.FormEvent<HTMLInputElement>, newValue?: string) => {
    this.setState({ User: newValue })
  }
  private _getInizio = (ev: React.FormEvent<HTMLInputElement>, newValue?: string) => {
    this.setState({ Inizio: newValue })
  }
  private _getFine = (ev: React.FormEvent<HTMLInputElement>, newValue?: string) => {
    this.setState({ Fine: newValue })
  }


  private async submitRequest() {


    var flowUrl = "https://prod-09.westeurope.logic.azure.com:443/workflows/345093e1dfce4e919a5efa9055e0ae8d/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=q1QO5JMDXcxB7iJmeR7IbidZfT-3gy_j_DKxxq17K1k";
    const requestHeaders: Headers = new Headers();
    requestHeaders.append("Content-type", "application/json");
    requestHeaders.append("Cache-Control", "no-cache");




    const postOptions: RequestInit = {
      headers: requestHeaders,
      body: `{\r\n    "Nome": "${this.state.Nome}",\r\n    "Cognome": "${this.state.Cognome}", \r\n    "Username": "${this.state.User}", \r\n    "DataInizio": '${this.state.Inizio}', \r\n    DataFine: '${this.state.Fine}'\r\n`,
      method: "POST"
    };


    console.log('Wait started');
    await fetch(flowUrl, postOptions).then((response) => {
      console.log('Response returned');



      if (response.ok) {
        alert("Request submitted!!");
      }
      else {
        alert("Error!!!");

      }
    });
  }


}
