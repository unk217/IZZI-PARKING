<template>
  <v-container fluid>
    <v-row justify="start" class="pt-4 ml-16 mr-2">
      <v-col cols="12" lg="12" sm="12" md="12">
        <v-card elevation="12">
          <v-card-text class="mt-0">
            <h2 class="text-start text-title primary--text">
              <v-icon color="primary" class="mb-1">mdi-home</v-icon>
              Inicio > Puestos de control
            </h2>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="12" md="12" sm="12">
        <v-card elevation="4">
          <v-alert border="top" colored-border type="info" elevation="4">
            Los registros de las rondas se eliminarán trimestralmente, se define como política de uso.
          </v-alert>
        </v-card>
      </v-col>
      <v-col cols="12" lg="4" sm="4" md="4" v-for="(zone, index) in zones" :key="index" class="botone">
        <v-hover v-slot="{ hover }" open-delay="100">
          <v-card :elevation="hover ? 24 : 12">
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="primary--text text-h5 mb-1">
                  {{ zone.adress }}
                </v-list-item-title>
                <v-list-item-subtitle>{{ zone.department }}</v-list-item-subtitle>
                <v-list-item-subtitle>{{ zone.city }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-icon tile size="80" color="grey">
                <v-icon size="80" :color="hover ? 'accent' : 'primary'" class="delay"> mdi-home-silo-outline </v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-card-actions>
              <v-hover v-slot="{ hover }" open-delay="100">
                <v-btn
                  :color="hover ? 'info' : 'primary'"
                  :outlined="hover ? false : true"
                  @click="showRecords(zone)"
                  class="botone"
                  >Registros
                </v-btn>
              </v-hover>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <RECORDS :object_records="object_records" :v-if="object_records.state"> </RECORDS>
    <ALERT
      @cancelAlert="cancelAlert()"
      @confirm="confirm()"
      @exitEsc="cancel()"
      @cancel="cancel()"
      v-if="alert.state"
      :alert="alert"
    ></ALERT>
  </v-container>
</template>

<script>

import { mapActions, mapGetters } from "vuex";
import { current_user } from "@/global";
import { Alert } from "@/mixins/alert";
import moment from "moment";

export default {
  components: { RECORDS: Records },
  mixins: [Alert],
  data: () => ({
    object_records: {
      records: null,
      state: false,
    },
    name: `${current_user.name} ${current_user.last_name}`,
    zones: [],
  }),
  computed: {
    name_complete() {
      let name = this.name.split(" ");
      name = name.map((p) => p[0].toUpperCase() + p.substring(1));
      return name.join(" ");
    },
    ...mapGetters({ getZoneData_: "zone/getZoneData_" }),
  },
  methods: {
    ...mapActions({
      getZones_: "zone/getZones_",
      getRecord_: "record/getRecord_",
      recordHistory_: "record/recordHistory_",
    }),
    cancel() {
      this.deletAlert();
    },
    async showRecords(zone) {
      const DATA = {
        id_watchman: "**", //ALL USERS
        zone_id: zone._id,
        since: moment().subtract(2, "days").format("YYYY-MM-DD"),
        until: moment().format("YYYY-MM-DD"),
      };

      const RES = await this.recordHistory_({ DATA });

      if (RES.A) return this.sendAlert("record_0", "info");
      else {
        this.object_records = {
          records: RES,
          zone: zone.adress,
          state: true,
        };
      }
    },
    redirect() {
      let name = "enanohpta";
      window.open(`http://localhost:3000/login/${name}`);
    },
    async loadZones() {
      await this.getZones_();
      this.zones = this.getZoneData_("get_zones");
    },
  },
  created() {
    this.loadZones();
  },
};
</script>
