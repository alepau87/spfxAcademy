import * as React from 'react';
import styles from './SharepointListWithPnP.module.scss';
import { ISharepointListWithPnPProps } from './ISharepointListWithPnPProps';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { DefaultButton, PrimaryButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { escape } from '@microsoft/sp-lodash-subset';
import { SharepointControls } from '../Controls/SharepointControls';
import { BookModel } from '../Model/BookModel';

export interface IDetailsListState {
  items: BookModel[];
  panelOpen: boolean;
}



export default class SharepointListWithPnP extends React.Component<ISharepointListWithPnPProps, IDetailsListState> {


  constructor(contextProps: ISharepointListWithPnPProps) {
    super(null);

    this.state = { items: [], panelOpen: false };
    SharepointControls.GetDataFromListByListTitle(contextProps.ListTitle).then((books) => {
      this.setState({ items: books });
    });
  }



  public render(): React.ReactElement<ISharepointListWithPnPProps> {
    return (
      <div>
        <div>
          <DetailsList
            items={this.state.items}
            setKey="set"
            layoutMode={DetailsListLayoutMode.fixedColumns}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          />
        </div>
        <div>
          <PrimaryButton
            data-automation-id="test"
            text="Show Panel"
            onClick={this._ShowPanel}
            allowDisabledFocus={true}
          />
        </div>
        <div>
          <Panel
            isOpen={this.state.panelOpen}
            type={PanelType.smallFixedFar}
            onDismiss={this._hidePanel}
            headerText="Add New Book"
            closeButtonAriaLabel="Close"
            onRenderFooterContent={this._onRenderFooterContent}
          >
            <TextField id="Title" label="Title" required />
            <TextField id="Autore" label="Autore" required />
            <TextField id="Anno" label="Anno" required />
            <TextField id="Pagine" label="Pagine" required />
          </Panel>

        </div>
      </div>
    );
  }


  private _ShowPanel = () => {
    this.setState({ panelOpen: true });
  }

  private _hidePanel = () => {
    this.setState({ panelOpen: false });
  };

  private _onRenderFooterContent = () => {
    return (
      <div>
        <PrimaryButton onClick={this._AddNewItem}>
          Aggiungi
        </PrimaryButton>
      </div>
    );
  };

  private _AddNewItem = () => {

    var Titolo = (document.getElementById("Title") as any).value;
    var Autore = (document.getElementById("Autore") as any).value;
    var Anno = (document.getElementById("Anno") as any).value;
    var Pagine = (document.getElementById("Pagine") as any).value;

    var book: BookModel = {
      Titolo: Titolo,
      Autore: Autore,
      Anno: Anno,
      Pagine: Pagine
    };

    SharepointControls.AddItemToListByListTitle(this.props.ListTitle, book).then((result) => {
      (document.getElementById("Title") as any).value = "";
      (document.getElementById("Autore") as any).value = "";
      (document.getElementById("Anno") as any).value = "";
      (document.getElementById("Pagine") as any).value = "";
      this._hidePanel();
      alert(result);
    });

  }





}
