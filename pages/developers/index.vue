<template>
  <div>
      <PageHeader :title="title" :items="items" />

      <div class="col">
        <div class="card">
          <div class="card-body wlg-1000">
            <h4 class="h4">PRM ochiq ma'lumotlaridan o'zingizning loyihangiz uchun foydalaning! </h4>
            <p class="card-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod qui ipsam perspiciatis blanditiis. Nesciunt dolor commodi totam placeat unde in mollitia, alias tempore temporibus veniam saepe, dolore eaque? Fugiat, doloremque.
            </p>
          </div>
        </div>
      </div>

      <div class="col">
        <h4 class="h4"><span class="badge badge-success text-light">API</span> Shahar / viloyat:</h4>
        <div class="card">
          <div class="card-body">
            <div class="inner-card--custom">
                <h5 class="h5"><span class="badge badge-info text-light">GET</span> Barcha shaharlar: </h5>
                <div class="alert alert-dark text-monospace">https://api.domain.com/prm/get-data/cities/all/?access={user_key}&auth={auth_key}</div>
            </div>
            <div class="inner-card--custom">
                <h5 class="h5"><span class="badge badge-info text-light">GET</span> Barcha shaharlar soni: </h5>
                <div class="alert alert-dark text-monospace">https://api.domain.com/prm/get-data/cities/count/?access={user_key}&auth={auth_key}</div>
            </div>
            <div class="inner-card--custom">
                <h5 class="h5"><span class="badge badge-info text-light">GET</span> Shaharlar [start-end]: </h5>
                <div class="alert alert-dark text-monospace">https://api.domain.com/prm/get-data/cities/pg/{start}/{end}/?access={user_key}&auth={auth_key}</div>
            </div>
            <div class="inner-card--custom">
                <h5 class="h5"><span class="badge badge-info text-light">GET</span> Shahar ID: </h5>
                <div class="alert alert-dark text-monospace">https://api.domain.com/prm/get-data/city/{id}/?access={user_key}&auth={auth_key}</div>
            </div>

          </div>
        </div>
      </div>

      <div class="col">
        <h4 class="h4"><span class="badge badge-success text-light">API</span> Loyihalar:</h4>
        <div class="card">
          <div class="card-body">
            <div class="inner-card--custom">
                <h5 class="h5"><span class="badge badge-info text-light">GET</span> Barcha loyihalar: </h5>
                <div class="alert alert-dark text-monospace">https://api.domain.com/prm/get-data/projects/all/?access={user_key}&auth={auth_key}</div>
            </div>
            <div class="inner-card--custom">
                <h5 class="h5"><span class="badge badge-info text-light">GET</span> Barcha loyihalar soni: </h5>
                <div class="alert alert-dark text-monospace">https://api.domain.com/prm/get-data/projects/count/?access={user_key}&auth={auth_key}</div>
            </div>
            <div class="inner-card--custom">
                <h5 class="h5"><span class="badge badge-info text-light">GET</span> Barcha loyihalar (statusga ko'ra): </h5>
                <div class="alert alert-dark text-monospace">https://api.domain.com/prm/get-data/projects/all/{status}/?access={user_key}&auth={auth_key}</div>
                <p class="card-text">Statuslar:</p>
                <ul>
                  <li><span class="text-monospace">progress</span> - ishga tushgan</li>
                  <li><span class="text-monospace">waiting</span> - kutilmoqda</li>
                  <li><span class="text-monospace">late</span> - kechikmoqda</li>
                  <li><span class="text-monospace">unconfirmed</span> - bekor qilingan</li>
                </ul>
            </div>
            <div class="inner-card--custom">
                <h5 class="h5"><span class="badge badge-info text-light">GET</span> Barcha loyihalar [start-end]: </h5>
                <div class="alert alert-dark text-monospace">https://api.domain.com/prm/get-data/projects/pg/{start}/{end}/?access={user_key}&auth={auth_key}</div>
            </div>
            <div class="inner-card--custom">
                <h5 class="h5"><span class="badge badge-info text-light">GET</span> Barcha loyihalar (shaharlarda): </h5>
                <div class="alert alert-dark text-monospace">https://api.domain.com/prm/get-data/projects/all/{city_id}/?access={user_key}&auth={auth_key}</div>
            </div>

          </div>
        </div>

        <div class="col">
        <h4 class="h4"><span class="badge badge-success text-light">API</span> Personal (PRM akkaunt):</h4>
        <div class="card">
          <div class="card-body">
            <div class="inner-card--custom">
                <h5 class="h5"><span class="badge badge-info text-light">GET</span> Shaxsiy ma'lumotlar: </h5>
                <div class="alert alert-dark text-monospace">https://api.domain.com/prm/personal/get-me/?access={user_key}&auth={auth_key}</div>
            </div>
            <div class="inner-card--custom">
                <h5 class="h5"><span class="badge badge-warning text-light">PATCH</span> Key'ni yangilash: </h5>
                <div class="alert alert-dark text-monospace">https://api.domain.com/prm/personal/update-key/</div>
                <p class="card-text">Body:</p>
                <div class="alert alert-primary w-max-content text-monospace">
                  { "access": <i>"user_key"</i>, "auth": <i>"auth_key"</i> }
                </div>
                <p class="card-text">Response:</p>
                <div class="alert alert-primary w-max-content text-monospace">
                  { "ok": true, data: { "access": <i>"new_user_key"</i>, "auth": <i>"new_auth_key"</i> } }
                </div>
            </div>
            <div class="inner-card--custom">
                <h5 class="h5"><span class="badge badge-danger text-light">DELETE</span> Profilni o'chirish: </h5>
                <div class="alert alert-dark text-monospace">https://api.domain.com/prm/personal/delete-user/?access={user_key}&auth={auth_key}</div>
            </div>

          </div>
        </div>
      </div>
      </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'PRM - Developers',
      items: [
        {
          text: 'Developers',
          active: true
        }
      ]
    }
  },
}
</script>

<style lang="scss">
  .wlg-1000 {
    width: 100%;
    max-width: 1000px;
  }

  .inner-card--custom {
    margin-bottom: 30px;
  }

  .w-max-content {
    width: max-content;
    max-width: 100%;
  }
</style>