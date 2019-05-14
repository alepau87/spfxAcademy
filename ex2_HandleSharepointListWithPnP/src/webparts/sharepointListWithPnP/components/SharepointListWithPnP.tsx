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
  Title: string;
  Autore: string;
  Anno: string;
  Pagine: string;
}



export default class SharepointListWithPnP extends React.Component<ISharepointListWithPnPProps, IDetailsListState> {


  constructor(contextProps: ISharepointListWithPnPProps) {
    super(null);

    this.state = { items: [], panelOpen: false, Title: "", Autore: "", Anno: "", Pagine: "" };
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
            <TextField id="Title" label="Title" required onChange={this._getTitolo} />
            <TextField id="Autore" label="Autore" required onChange={this._getAutore} />
            <TextField id="Anno" label="Anno" required onChange={this._getAnno} />
            <TextField id="Pagine" label="Pagine" required onChange={this._getPagine} />
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


    var book: BookModel = {
      Titolo: this.state.Title,
      Autore: this.state.Autore,
      Anno: this.state.Anno,
      Pagine: this.state.Pagine
    };

    SharepointControls.AddItemToListByListTitle(this.props.ListTitle, book).then((result) => {
      this.setState({ Title: "" });
      this.setState({ Autore: "" });
      this.setState({ Anno: "" });
      this.setState({ Pagine: "" });
      this._hidePanel();
      alert(result);

    });

  }


  private _getTitolo = (ev: React.FormEvent<HTMLInputElement>, newValue?: string) => {
    this.setState({ Title: newValue });
  }
  private _getAutore = (ev: React.FormEvent<HTMLInputElement>, newValue?: string) => {
    this.setState({ Autore: newValue });
  }
  private _getAnno = (ev: React.FormEvent<HTMLInputElement>, newValue?: string) => {
    this.setState({ Anno: newValue });
  }
  private _getPagine = (ev: React.FormEvent<HTMLInputElement>, newValue?: string) => {
    this.setState({ Pagine: newValue });
  }
}
