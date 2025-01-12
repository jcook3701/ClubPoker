import React from "react";
import TournamentData from "../../../types/TournamentData";
import { IonCol, IonRow } from "@ionic/react";

const TournamentsRowModifier: React.FC<{ tournaments: TournamentData[] }> = ({
  tournaments,
}) => (
  <>
    {tournaments.map((tournament) => (
      <IonRow className="grid-rows row" key={tournament.id}>
        <IonCol className="col" size="1">
          <p>{tournament.start}</p>
        </IonCol>
        <IonCol className="col" size="1">
          <p>{tournament.game}</p>
        </IonCol>
        <IonCol className="col" size="1">
          <p>{tournament.buyin}</p>
        </IonCol>
        <IonCol className="col" size="3">
          <p>{tournament.name}</p>
        </IonCol>
        <IonCol className="col" size="1">
          <p>{tournament.id}</p>
        </IonCol>
        <IonCol className="col" size="1">
          <p>{tournament.status}</p>
        </IonCol>
        <IonCol className="col" size="1">
          <p>{tournament.enrolled}</p>
        </IonCol>
      </IonRow>
    ))}
  </>
);

export default TournamentsRowModifier;
