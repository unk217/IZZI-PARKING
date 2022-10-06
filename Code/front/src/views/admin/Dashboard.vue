<template>
  <v-container fluid>
    <v-card>
      <v-img src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" style="height: 100%">
        <v-row class="py-8" align="center" justify="center" row="6" sm="6" md="6">
          <v-col cols="12" align="center" sm="6" md="6">
            <v-sheet height="64">
              <v-toolbar flat>
                <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday"> Hoy </v-btn>
                <v-btn fab text small color="grey darken-2" @click="prev">
                  <v-icon small> mdi-chevron-left </v-icon>
                </v-btn>
                <v-btn fab text small color="grey darken-2" @click="next">
                  <v-icon small> mdi-chevron-right </v-icon>
                </v-btn>
                <v-toolbar-title v-if="$refs.calendar">
                  {{ $refs.calendar.title }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-menu bottom right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                      <span>{{ typeToLabel[type] }}</span>
                      <v-icon right> mdi-menu-down </v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="type = 'day'">
                      <v-list-item-title>Dia</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'week'">
                      <v-list-item-title>Semana</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'month'">
                      <v-list-item-title>Mes</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = '4day'">
                      <v-list-item-title>4 Dias</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-toolbar>
            </v-sheet>
            <v-sheet height="400">
              <v-calendar
                ref="calendar"
                v-model="focus"
                color="primary"
                :events="events"
                :event-color="getEventColor"
                :type="type"
                @click:event="showEvent"
                @click:more="viewDay"
                @click:date="viewDay"
                @change="updateRange"
              ></v-calendar>
              <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
                <v-card color="grey lighten-4" min-width="350px" flat>
                  <v-toolbar :color="selectedEvent.color" dark>
                    <v-btn icon>
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text>
                    <span v-html="selectedEvent.details"></span>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn text color="secondary" @click="selectedOpen = false"> Cancelar </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </v-sheet>
          </v-col>
        </v-row>
      </v-img>
    </v-card>
    <RECORDS :object_records="object_records" :v-if="object_records.state"> </RECORDS>
    <ALERT @cancelAlert="cancelAlert()" @confirm="confirm()" @exitEsc="cancel()" @cancel="cancel()" v-if="alert.state" :alert="alert"></ALERT>
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
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    cancel() {
      this.deletAlert();
    },
    redirect() {
      let name = "enanohpta";
      window.open(`http://localhost:3000/login/${name}`);
    },
  },
  created() {},
};
</script>
