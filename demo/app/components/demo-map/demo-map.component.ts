import { Component, ContentChildren, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ViewerConfiguration } from '../../../../src/services/viewer-configuration/viewer-configuration.service';
import { AppSettingsService } from '../../services/app-settings-service/app-settings-service';
import { MapLayerProviderOptions } from '../../../../src/models/map-layer-provider-options.enum';
import { AcLayerComponent } from '../../../../src/components/ac-layer/ac-layer.component';
import { TracksLayerComponent } from '../tracks-layer/tracks-layer.component';
@Component({
  selector : 'demo-map',
  templateUrl : './demo-map.component.html',
  providers : [],
  styleUrls : ['./demo-map.component.css']
})
export class DemoMapComponent {
  @Input() tracksRealData: boolean;

  @ViewChild('layer') tracksLayer: TracksLayerComponent;
  arcGisMapServerProvider = MapLayerProviderOptions.ArcGisMapServer;

  constructor(private viewerConf: ViewerConfiguration, private appSettingsService: AppSettingsService) {
    viewerConf.viewerOptions = {
      selectionIndicator : false,
      timeline : false,
      infoBox : false,
      baseLayerPicker : false,
      animation : false,
      homeButton : false,
      geocoder : false,
      navigationHelpButton : false,
      navigationInstructionsInitiallyVisible : false,
    };

    viewerConf.viewerModifier = (viewer) => {
      viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      viewer.bottomContainer.remove();
    };

    this.appSettingsService.showTracksLayer = true;
	}

  removeAll() {
    this.tracksLayer.removeAll();
  }
}
