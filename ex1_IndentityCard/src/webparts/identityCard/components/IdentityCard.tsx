import * as React from 'react';
import styles from './IdentityCard.module.scss';
import { IIdentityCardProps } from './IIdentityCardProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { DefaultButton, PrimaryButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';


export default class IdentityCard extends React.Component<IIdentityCardProps> {



  public render(): React.ReactElement<IIdentityCardProps> {
    return (
      <div className={styles.identityCard}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <div className={styles.rowDetails}><span className={styles.titleRow}>Nome: </span>{this.props.nome} <span className={styles.titleRow}>- Cognome: </span> {this.props.cognome}</div>
              <div className={styles.rowDetails}><span className={styles.titleRow}>Luogo di Nascita: </span>{this.props.luogoNascita}</div>
              <div className={styles.rowDetails}><span className={styles.titleRow}>Sesso: </span>{this.props.sesso}<span className={styles.titleRow}> - Data di Nascita:</span> {this.ReturnItalianDate(this.props.dataNascita)}</div>
              <div className={styles.rowDetails}><span className={styles.titleRow}>Giorni di vita trascorsi: </span><span id="LifeDaysSpan"></span> </div>
            </div>
            <div className={styles.column}>
              <div>
                <img src={this.props.foto} className={styles.foto} />
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <input type="button" id="GetNumbersButton" value="Calcola Giorni di Vita"
            />
          </div>
        </div>
      </div>
    );
  }




  private ReturnItalianDate(data: any) {
    var newdata: string;
    if (data != undefined && data != null) {
      var insertedDate = new Date(data);
      newdata = insertedDate.toLocaleDateString('it-IT');
    }

    return newdata;
  }





}
