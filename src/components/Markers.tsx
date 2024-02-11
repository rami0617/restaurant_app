import { useEffect, Dispatch, SetStateAction, useCallback } from "react";
import { StoreType } from "@/interface";

interface MarkerProps {
  map: any;
  storeDatas: any[];
  setCurrentStore: Dispatch<SetStateAction<any>>;
}

export default function Markers({
  map,
  storeDatas,
  setCurrentStore,
}: MarkerProps) {
  const loadKakaoMarkers = useCallback(() => {
    if (map) {
      storeDatas &&
        storeDatas?.map((store) => {
          const imageSrc = store.bizcnd_code_nm
            ? `/images/markers/${store.bizcnd_code_nm}.png`
            : `/images/markers/default.png`;

          const imageSize = new window.kakao.maps.Size(40, 40);
          const imageOption = { offset: new window.kakao.maps.Point(27, 69) };

          const markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
          );

          const markerPosition = new window.kakao.maps.LatLng(
            store.y_dnts,
            store.x_cnts
          );

          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            image: markerImage,
          });

          marker.setMap(map);

          const content = `<div class="infowindow">${store.upso_nm}</div>`;

          const customOverlay = new window.kakao.maps.CustomOverlay({
            position: markerPosition,
            content: content,
            xAnchor: 0.6,
            yAnchor: 0.91,
          });

          window.kakao.maps.event.addListener(marker, "mouseover", () => {
            customOverlay.setMap(map);
          });

          window.kakao.maps?.event?.addListener(marker, "mouseout", () => {
            customOverlay.setMap(null);
          });

          window.kakao.maps?.event?.addListener(marker, "click", () => {
            setCurrentStore(store);

            let newMarker = new window.kakao.maps.Marker({
              //
              position: "",
            });
          });
        });
    }
  }, [map, setCurrentStore, storeDatas]);

  useEffect(() => {
    loadKakaoMarkers();
  }, [loadKakaoMarkers, map]);

  return <></>;
}
