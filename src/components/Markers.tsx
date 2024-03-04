import { useEffect, Dispatch, SetStateAction, useCallback } from "react";
import { StoreType } from "@/interface";

interface MarkerProps {
  map: any;
  stores: StoreType[];
  setCurrentStore: Dispatch<SetStateAction<any>>;
}

export default function Markers({ map, stores, setCurrentStore }: MarkerProps) {
  const loadKakaoMarkers = useCallback(() => {
    if (map) {
      stores &&
        stores?.map((store) => {
          const imageSrc = store?.category
            ? `/images/markers/${store?.category}.png`
            : `/images/markers/default.png`;

          const imageSize = new window.kakao.maps.Size(40, 40);
          const imageOption = { offset: new window.kakao.maps.Point(27, 69) };

          const markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
          );

          const markerPosition = new window.kakao.maps.LatLng(
            store?.lat,
            store?.lng
          );

          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            image: markerImage,
          });

          marker.setMap(map);

          const content = `<div class="infowindow">${store?.name}</div>`;

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
  }, [map, setCurrentStore, stores]);

  useEffect(() => {
    loadKakaoMarkers();
  }, [loadKakaoMarkers, map]);

  return <></>;
}
