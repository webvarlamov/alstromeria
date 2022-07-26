import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-accept-reject-buttons',
  templateUrl: './accept-reject-buttons.component.html',
  styleUrls: ['./accept-reject-buttons.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcceptRejectButtonsComponent implements OnInit {
  @Input() minButtonWidth = '90px';

  @Output() acceptButtonClick = new EventEmitter<void>();
  @Output() rejectButtonClick = new EventEmitter<void>();

  @Input() acceptAllow = true;
  @Input() rejectAllow = true;

  @Input() acceptShow = true;
  @Input() rejectShow = true;

  @Input() acceptLabel = 'Применить';
  @Input() rejectLabel = 'Сброс';

  @Input() showIcons = false;

  constructor() { }

  ngOnInit(): void {}
}
