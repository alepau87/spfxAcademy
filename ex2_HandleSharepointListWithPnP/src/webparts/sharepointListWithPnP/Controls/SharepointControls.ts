import { sp, ItemAddResult } from "@pnp/sp";
import { BookModel } from "../Model/BookModel";




export class SharepointControls {



    public static GetDataFromListByListTitle(listname: string): Promise<BookModel[]> {
        try {
            return new Promise<BookModel[]>((resolve, reject) => {
                var BookList: BookModel[] = [];
                sp.web.lists.getByTitle(listname).items.get().then((items: any[]) => {
                    items.map((singleItem) => {
                        BookList.push({
                            Titolo: singleItem["Title"],
                            Autore: singleItem["AutoreLibro"],
                            Anno: singleItem["AnnoPubblicazione"],
                            Pagine: singleItem["PagineLibro"]
                        });
                    });
                    resolve(BookList);
                });
            });

        }
        catch (e) {
            console.error(e);
        }
    }


    public static AddItemToListByListTitle(listname: string, model: BookModel): Promise<string> {

        try {
            return new Promise<string>((resolve, reject) => {
                sp.web.lists.getByTitle(listname).items.add({
                    Title: model.Titolo,
                    AutoreLibro: model.Autore,
                    AnnoPubblicazione: model.Anno,
                    PagineLibro: model.Pagine
                }).then((iar: ItemAddResult) => {
                    console.log(iar);
                    resolve("Item Added");
                }).catch(ex => { console.error(ex); reject("Error Adding Item"); });
            });
        }
        catch (e) {
            console.error(e);
        }


    }


}