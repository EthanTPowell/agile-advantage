import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SearchPipe } from "./search.pipe";
import { TimeAgoPipe } from "./time-ago.pipe";
import { SortByDatePipe } from "./sortByDate.pipe";


@NgModule({
    declarations: [SearchPipe, TimeAgoPipe, SortByDatePipe],
    imports: [CommonModule],
    exports: [SearchPipe, TimeAgoPipe, SortByDatePipe ]
}
)

export class PipesModule{ }