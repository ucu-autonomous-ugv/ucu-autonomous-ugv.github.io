### Overview

UCU SLAM Dataset v1 consists of thirteen sequences collected in two outdoor environments: the Ukrainian Catholic University campus and Stryiskyi Park in Lviv, Ukraine. It was designed to evaluate distinct aspects of SLAM systems — loop closure detection, long-term drift, robustness to illumination changes, and operation in environments of varying geometric complexity. All sequences were recorded on a Clearpath Husky A200, manually driven along predefined trajectories at approximately constant speed, and each one carries synchronized RGB, depth, IMU, wheel odometry and GNSS measurements. Several routes are deliberately repeated under different conditions: reverse sequences test directional invariance, while twilight sequences test robustness to low light without changing the underlying trajectory. The release is grouped into campus sequences (1–5), park sequences (6–10), point-to-point linear routes for drift evaluation (11–13), and three indoor calibration sequences (A1–A3).

The sensor suite comprises an Intel RealSense D435 RGB-D camera (640×480 at 30 fps), a Phidgets Spatial 1042 IMU (accelerometer and gyroscope at 125 Hz), the Husky's four wheel encoders (78,000 ticks/m), and a Holybro H-RTK F9P GNSS receiver — without RTK correction in this version. Camera intrinsics, IMU noise parameters, and the camera-to-body extrinsics were estimated with the Kalibr toolbox from the calibration sequences, recorded against an AprilGrid target. Ground truth is currently derived from GNSS alone, linearized from geodetic to ENU coordinates about a fixed origin on campus, which yields metre-level position without orientation; fusing visual-inertial odometry with wheel odometry and GNSS to recover full 6-DoF ground truth is planned for a future release. The data ships in two formats — ROS 2 rosbags (MCAP) and a TUM RGB-D–compatible layout — alongside a single calibration file covering all intrinsics and extrinsics.

### Sequences

<div class="image-grid">
  <figure>
    <img src="/assets/img/ucu-slam-dataset-sequence-1-map.png" alt="Route map of sequence 1, a closed loop around the university church, plotted in metres of easting and northing relative to the dataset origin" />
    <figcaption>Sequence 1 — the simplest route in the dataset: a closed loop around the university church, plotted relative to the ENU origin on campus.</figcaption>
  </figure>
  <figure>
    <img src="/assets/img/ucu-slam-dataset-sequence-8-twilight.jpg" alt="Onboard RGB camera frame from a park sequence recorded at twilight, showing a dark tree-lined path with heavy sensor noise" />
    <figcaption>Sequence 8 — onboard RGB view from the park loop recorded at twilight, the low-light conditions the dataset is meant to stress.</figcaption>
  </figure>
</div>

### Programme

- **Duration:** February – September 2026
- **Students:** Andriy Kryvyi, Hordii Yeliseev
- **Mentors:** Oleksandr Kosovan, Yaroslav Prytula

### Results

The dataset is published on Hugging Face, with the collection, calibration and conversion tooling kept in the repository on GitHub.

<div class="attachments">
  <a class="attachment-row" href="https://huggingface.co/datasets/ucu-autonomous-ugv/ucu-slam-dataset-v1" target="_blank" rel="noopener noreferrer">
    <span class="attachment-stamp">
      <svg viewBox="0 0 24 24" fill="currentColor" width="19" height="19"><path d="M12.025 1.13c-5.77 0-10.449 4.647-10.449 10.378 0 1.112.178 2.181.503 3.185.064-.222.203-.444.416-.577a.96.96 0 0 1 .524-.15c.293 0 .584.124.84.284.278.173.48.408.71.694.226.282.458.611.684.951v-.014c.017-.324.106-.622.264-.874s.403-.487.762-.543c.3-.047.596.06.787.203s.31.313.4.467c.15.257.212.468.233.542.01.026.653 1.552 1.657 2.54.616.605 1.01 1.223 1.082 1.912.055.537-.096 1.059-.38 1.572.637.121 1.294.187 1.967.187.657 0 1.298-.063 1.921-.178-.287-.517-.44-1.041-.384-1.581.07-.69.465-1.307 1.081-1.913 1.004-.987 1.647-2.513 1.657-2.539.021-.074.083-.285.233-.542.09-.154.208-.323.4-.467a1.08 1.08 0 0 1 .787-.203c.359.056.604.29.762.543s.247.55.265.874v.015c.225-.34.457-.67.683-.952.23-.286.432-.52.71-.694.257-.16.547-.284.84-.285a.97.97 0 0 1 .524.151c.228.143.373.388.43.625l.006.04a10.3 10.3 0 0 0 .534-3.273c0-5.731-4.678-10.378-10.449-10.378M8.327 6.583a1.5 1.5 0 0 1 .713.174 1.487 1.487 0 0 1 .617 2.013c-.183.343-.762-.214-1.102-.094-.38.134-.532.914-.917.71a1.487 1.487 0 0 1 .69-2.803m7.486 0a1.487 1.487 0 0 1 .689 2.803c-.385.204-.536-.576-.916-.71-.34-.12-.92.437-1.103.094a1.487 1.487 0 0 1 .617-2.013 1.5 1.5 0 0 1 .713-.174m-10.68 1.55a.96.96 0 1 1 0 1.921.96.96 0 0 1 0-1.92m13.838 0a.96.96 0 1 1 0 1.92.96.96 0 0 1 0-1.92M8.489 11.458c.588.01 1.965 1.157 3.572 1.164 1.607-.007 2.984-1.155 3.572-1.164.196-.003.305.12.305.454 0 .886-.424 2.328-1.563 3.202-.22-.756-1.396-1.366-1.63-1.32q-.011.001-.02.006l-.044.026-.01.008-.03.024q-.018.017-.035.036l-.032.04a1 1 0 0 0-.058.09l-.014.025q-.049.088-.11.19a1 1 0 0 1-.083.116 1.2 1.2 0 0 1-.173.18q-.035.029-.075.058a1.3 1.3 0 0 1-.251-.243 1 1 0 0 1-.076-.107c-.124-.193-.177-.363-.337-.444-.034-.016-.104-.008-.2.022q-.094.03-.216.087-.06.028-.125.063l-.13.074q-.067.04-.136.086a3 3 0 0 0-.135.096 3 3 0 0 0-.26.219 2 2 0 0 0-.12.121 2 2 0 0 0-.106.128l-.002.002a2 2 0 0 0-.09.132l-.001.001a1.2 1.2 0 0 0-.105.212q-.013.036-.024.073c-1.139-.875-1.563-2.317-1.563-3.203 0-.334.109-.457.305-.454m.836 10.354c.824-1.19.766-2.082-.365-3.194-1.13-1.112-1.789-2.738-1.789-2.738s-.246-.945-.806-.858-.97 1.499.202 2.362c1.173.864-.233 1.45-.685.64-.45-.812-1.683-2.896-2.322-3.295s-1.089-.175-.938.647 2.822 2.813 2.562 3.244-1.176-.506-1.176-.506-2.866-2.567-3.49-1.898.473 1.23 2.037 2.16c1.564.932 1.686 1.178 1.464 1.53s-3.675-2.511-4-1.297c-.323 1.214 3.524 1.567 3.287 2.405-.238.839-2.71-1.587-3.216-.642-.506.946 3.49 2.056 3.522 2.064 1.29.33 4.568 1.028 5.713-.624m5.349 0c-.824-1.19-.766-2.082.365-3.194 1.13-1.112 1.789-2.738 1.789-2.738s.246-.945.806-.858.97 1.499-.202 2.362c-1.173.864.233 1.45.685.64.451-.812 1.683-2.896 2.322-3.295s1.089-.175.938.647-2.822 2.813-2.562 3.244 1.176-.506 1.176-.506 2.866-2.567 3.49-1.898-.473 1.23-2.037 2.16c-1.564.932-1.686 1.178-1.464 1.53s3.675-2.511 4-1.297c.323 1.214-3.524 1.567-3.287 2.405.238.839 2.71-1.587 3.216-.642.506.946-3.49 2.056-3.522 2.064-1.29.33-4.568 1.028-5.713-.624"/></svg>
    </span>
    <span class="attachment-text">
      <span class="attachment-title">Dataset</span>
      <span class="attachment-desc">UCU SLAM Dataset v1 on Hugging Face</span>
    </span>
    <span class="attachment-go">
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.97 7 1.96 2 6.963-7 3.993 4v-10z"/></svg>
    </span>
  </a>
  <a class="attachment-row" href="https://github.com/ucu-autonomous-ugv/ucu-slam-dataset" target="_blank" rel="noopener noreferrer">
    <span class="attachment-stamp">
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.804 5.624-5.475 5.92.43.37.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .32.216.694.825.576C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z"/></svg>
    </span>
    <span class="attachment-text">
      <span class="attachment-title">Repository</span>
      <span class="attachment-desc">Calibration files and tooling on GitHub</span>
    </span>
    <span class="attachment-go">
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.97 7 1.96 2 6.963-7 3.993 4v-10z"/></svg>
    </span>
  </a>
</div>
