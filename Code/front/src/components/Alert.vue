<template>
  <v-dialog v-model="alert.state" persistent width="500">
    <v-card width="500">
      <v-container>
        <v-alert border="top" colored-border :color="color" class="my-0 py-0">
          <v-row align="center">
            <v-col cols="8" lg="9" md="9" sm="9" class="ml-0 pl-0">
              <v-row justify="center" align="center">
                <v-col cols="12" lg="12" md="12" sm="12" class="ml-0 pl-0">
                  <h2 :class="`mt-2 ${color}--text text-center`">
                    {{ title }}
                  </h2>
                  <h4 class="text-center">
                    {{ body }}
                  </h4>
                </v-col>
                <v-col cols="12" lg="12" md="12" sm="12" v-if="!btn_cancel" class="mx-auto py-0 my-0">
                  <v-card-actions class="mx-0">
                    <v-btn ref="btn3" @click="cancel" class="botone mx-auto" :color="color" outlined
                      >cerrar
                      <v-icon :color="color" dark translate="true" class="ml-2">fa-circle-xmark</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-col>
                <v-col cols="6" lg="6" md="6" sm="6" class="py-2 my-0" v-if="btn_cancel">
                  <v-btn ref="btn1" outlined color="success" width="110" class="botone ml-md-13 ml-sm-10" @click="confirm">
                    Aceptar
                    <v-icon>mdi-check</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="6" lg="6" md="6" sm="6" class="py-2 my-0" v-if="btn_cancel">
                  <v-btn color="error" outlined width="110" @click="cancel" class="botone" ref="btn2">
                    cancelar
                    <v-icon>mdi-close-circle</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="4" lg="3" md="3" sm="3">
              <lottie-animation
                :animationData="type_alert"
                class="mx-auto botone mt-3"
                style="height: 100px"
                v-if="alert.state"
                :autoPlay="true"
                ref="anim_login"
                id="anim_login"
                :loop="true"
                :speed="2"
                content
              />
            </v-col>
          </v-row>
        </v-alert>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import LottieAnimation from "lottie-web-vue";
import error from "../../src/assets/image/error.json";
import info from "../../src/assets/image/info.json";
import warning from "../../src/assets/image/warning.json";
import success from "../../src/assets/image/success.json";
export default {
  props: {
    alert: Object,
  },
  components: {
    LottieAnimation,
  },
  data() {
    return {
      list_alert: {
        warning: ["mdi-alert-circle", "¡Precaución!", warning],
        error: ["mdi-close-octagon-outline", "¡Error!", error],
        success: ["mdi-check-circle-outline", "¡Realizado!", success],
        info: ["mdi-information-outline", "¡Información!", info],
      },
      btn_cancel: false,
      type_alert: "",
      title: "",
      color: "",
      icon: "",
      body: "",
    };
  },
  methods: {
    msjalert(code) {
      this.btn_cancel = true;
      setTimeout(() => {
        this.$refs.btn2.$el.focus();
      }, 100);
      switch (code) {
        case "xlsx":
          this.body = `¿Generar Excel Formato XLSX?`;
          break;
        case "pdf":
          this.body = `¿Generar Impresión Formato PDF?`;
          break;
        case "csv":
          this.body = `¿Generar Impresión Formato CSV?`;
          break;
        case "user":
          this.body = "¿Desea crear usuario?";
          break;
        case "delete_user":
          this.body = "¿Desea eliminar usuario?";
          break;
        case "delete_zone":
          this.body = "¿Desea eliminar punto de control?";
          break;
        case "delete_point":
          this.body = `Desea eliminar el punto "${this.alert.description}"`;
          break;
        case "out_0":
          this.body = "¿Desea cerrar la sesión?";
          break;
        default:
          this.body = this.alert.code;
          break;
      }
      return this.body;
    },
    msjError(code) {
      setTimeout(() => {
        this.$refs.btn3.$el.focus();
      }, 100);
      switch (code) {
        case "field_0":
          this.body = "Este campo es requerido";
          break;
        case "field_1":
          this.body = "Todos campos son requeridos";
          break;
        case "email_1":
          this.body = `Correo electrónico en uso`;
          break;
        case "user_0":
          this.body = `Debes ingresar un usuario`;
          break;
        case "user_1":
          this.body = `Nombre de usuario en uso`;
          break;
        case "user_2":
          this.body = `Datos incorrectos, verifique los campos`;
          break;
        case "user_3":
          this.body = `No hiciste ningún cambio`;
          break;
        case "user_post":
          this.body = `Usuario creado correctamente`;
          break;
        case "user_put":
          this.body = `Usuario modificado`;
          break;
        case "user_error":
          this.body = `Error creando usuario`;
          break;
        case "user-get":
          this.body = `Error creando usuario`;
          break;
        case "user_inac":
          this.body = `Usuario inactivo, imposible acceder`;
          break;
        case "pass_0":
          this.body = `La contraseña es igual a la anterior`;
          break;
        case "pass_1":
          this.body = `Contraseña cambiada correctamente`;
          break;
        case "pass_2":
          this.body = `La contraseña es incorrecta`;
          break;
        case "pass_3":
          this.body = `La contraseña no fue cambiada, intentelo nuevamente`;
          break;
        case "adress_1":
          this.body = `La dirección o nombre ya existe`;
          break;
        case "zone_1":
          this.body = `Puesto de control creado`;
          break;
        case "zone_post":
          this.body = `No se pudo crear el punto de control`;
          break;
        case "zone_delete_1":
          this.body = `No se pudo eliminar el punto de control`;
          break;
        case "zone_delete":
          this.body = `Puesto de control eliminado`;
          break;
        case "zone_point":
          this.body = `Este puesto de control no tiene puntos agregados`;
          break;
        case "point_1":
          this.body = `Punto creado exitosamente`;
          break;
        case "point_2":
          this.body = `Punto eliminado correctamente`;
          break;
        case "point_error_2":
          this.body = `Error eliminando punto`;
          break;
        case "point_0":
          this.body = `El punto ya existe`;
          break;
        case "point_error":
          this.body = `Error creando punto`;
          break;
        case "record_0":
          this.body = `No existen registros`;
          break;
        case "doc_1":
          this.body = `Número de cédula existe`;
          break;
        case "N1":
          this.body = `Dato ${this.alert.description} correctamente`;
          break;
        case "serv_0":
          this.body = `Error de conexión con el servidor`;
          break;
        case "qr_0":
          this.body = `Registro agregado correctamente`;
          break;
        case "qr_1":
          this.body = `Error leyendo QR`;
          break;
        case "qr_2":
          this.body = `Qr no valido`;
          break;
        default:
          this.body = this.alert.description;
          break;
      }
      return this.body;
    },
    validTypeAlert() {
      for (const key of Object.keys(this.list_alert)) {
        if (this.alert.type == key) {
          this.type_alert = this.list_alert[key][2];
          this.title = this.list_alert[key][1];
          this.icon = this.list_alert[key][0];
          this.color = key;
          break;
        }
      }
    },
    confirm() {
      this.$emit("confirm");
    },
    cancel() {
      this.$emit("cancel");
    },
    exit() {
      if (event.keyCode === 27) {
        if (this.btn_cancel) {
          this.$emit("cancel");
        } else {
          this.$emit("exitEsc");
        }
      }
    },
    checkKey(event) {
      switch (event.which) {
        case 39: //right
          this.$refs.btn2.$el.focus();
          break;
        case 37: //left
          this.$refs.btn1.$el.focus();
          break;
        default:
          null;
          break;
      }
    },
  },
  created() {
    this.validTypeAlert();
  },
  mounted() {
    if (["p", "P"].includes(this.alert.option)) {
      this.msjalert(this.alert.code);
    } else {
      this.msjError(this.alert.code);
    }
    document.addEventListener("keydown", this.exit);
    document.addEventListener("keydown", this.checkKey);
  },
  destroyed() {
    document.removeEventListener("keydown", this.exit);
    document.removeEventListener("keydown", this.checkKey);
  },
};
</script>
