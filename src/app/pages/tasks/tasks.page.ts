import { Component, inject, signal } from '@angular/core';
import { trpcResource } from '@fhss-web-team/frontend-utils';
import { TRPC_CLIENT } from '../../utils/trpc.client';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TaskCardComponent } from './task-card/task-card.component';

@Component({
  selector: 'app-tasks',
  imports: [MatProgressSpinnerModule, MatPaginator, TaskCardComponent],
  templateUrl: './tasks.page.html',
  styleUrl: './tasks.page.scss',
})
export class TasksPage {
  private readonly trpc = inject(TRPC_CLIENT);

  protected readonly PAGE_SIZE = 12 as const;
  private readonly pageOffset = signal(0);

  protected handlePageEvent(e: PageEvent) {
    this.pageOffset.set(e.pageIndex * e.pageSize);
  }

  protected readonly taskResource = trpcResource(
    this.trpc.tasks.getTasksByUser.mutate,
    () => ({
      pageSize: this.PAGE_SIZE,
      pageOffset: this.pageOffset(),
    }),
    { autoRefresh: true }
  );
}
