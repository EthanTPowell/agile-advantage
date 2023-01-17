import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SearchPipe } from "./search.pipe";
import { TimeAgoPipe } from "./time-ago.pipe";
import { SortByDatePipe } from "./sortByDate.pipe";
import { SearchProjectsPipe } from "./search-projects.pipe";


@NgModule({
    declarations: [SearchPipe, TimeAgoPipe, SortByDatePipe, SearchProjectsPipe],
    imports: [CommonModule],
    exports: [SearchPipe, TimeAgoPipe, SortByDatePipe, SearchProjectsPipe ]
}
)

export class PipesModule{ }