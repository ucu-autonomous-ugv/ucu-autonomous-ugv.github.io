### Abstract

Simultaneous localization and mapping (SLAM) is one of the fundamental problems in robotics, as it enables autonomous operations in real-world scenarios. Under low illumination, reduced contrast, sensor noise, and motion blur degrade both feature extraction and feature matching, while compensating with LiDAR, depth, or thermal sensors raises cost, power draw, and integration complexity. Existing benchmarks remain dominated by well-lit indoor or daylight sequences, leaving open how far SLAM with standard RGB cameras can be pushed in the dark.

We benchmark six systems spanning the feature-based, direct, filter-based, and learning-based paradigms — ORB-SLAM3, DSO, Kimera-VIO, OpenVINS, DPVO, and DPV-SLAM — on five LaMARia sequences of varying difficulty and illumination, reporting absolute and relative pose error alongside control-point recall. Kimera-VIO is the only system to track all five sequences to completion, combining the lowest relative pose error with steadily growing absolute error due to the absence of loop closure; DPVO and DPV-SLAM never lose tracking but incur absolute errors of roughly 100 m under low light; and the classical monocular pipelines (ORB-SLAM3, DSO) together with the filter-based OpenVINS fail outright or diverge on most of the harder and low-light sequences.

The results suggest that RGB-only SLAM maintains stable low-light tracking only when both inertial fusion and global optimization are present. Closing the remaining gap will likely require low-light-specific learned front-ends or a return to complementary sensing.

### Estimated trajectories

<div class="image-grid">
  <figure>
    <img src="/assets/img/low-light-slam-trajectories-1.jpg" alt="Estimated trajectories of Kimera-VIO, DSO, DPVO and DPV-SLAM plotted over a city map against the pseudo-ground-truth track, with sixteen survey control points marked" />
    <figcaption>Kimera-VIO, DSO, DPVO and DPV-SLAM against the pseudo-ground-truth track (16 survey control points). Absolute pose error is given per system in the legend.</figcaption>
  </figure>
  <figure>
    <img src="/assets/img/low-light-slam-trajectories-2.jpg" alt="Estimated trajectories of Kimera-VIO, OpenVINS, DPVO and DPV-SLAM plotted over a city map against the pseudo-ground-truth track, with fifteen survey control points marked" />
    <figcaption>Kimera-VIO, OpenVINS, DPVO and DPV-SLAM on a second sequence (15 survey control points). The learning-based pipelines keep tracking but drift far from the reference track.</figcaption>
  </figure>
</div>

### Programme

- **Duration:** February – July 2026
- **Students:** Oleh Basystyi, Anna Stasyshyn
- **Mentors:** Oleksandr Kosovan, Yaroslav Prytula

### Results

The programme produced a full benchmark report, published as a preprint on arXiv and deposited in the UCU institutional repository together with the slides.

<div class="attachments">
  <a class="attachment-row" href="https://arxiv.org/abs/2607.17699" target="_blank" rel="noopener noreferrer">
    <span class="attachment-stamp">
      <svg viewBox="0 0 246.978 110.119" fill="currentColor" width="29" height="13"><g transform="translate(-358.165 -223.27)"><path d="M492.976,269.5l24.36-29.89c1.492-1.989,2.2-3.03,1.492-4.723a5.142,5.142,0,0,0-4.481-3.161h0a4.024,4.024,0,0,0-3.008,1.108L485.2,261.094Z"/><path d="M526.273,325.341,493.91,287.058l-.972,1.033-7.789-9.214-7.743-9.357-4.695,5.076a4.769,4.769,0,0,0,.015,6.53L520.512,332.2a3.913,3.913,0,0,0,3.137,1.192,4.394,4.394,0,0,0,4.027-2.818C528.4,328.844,527.6,327.133,526.273,325.341Z"/><path d="M479.215,288.087l6.052,6.485L458.714,322.7a2.98,2.98,0,0,1-2.275,1.194,3.449,3.449,0,0,1-3.241-2.144c-.513-1.231.166-3.15,1.122-4.168l.023-.024.021-.026,24.851-29.448m-.047-1.882-25.76,30.524c-1.286,1.372-2.084,3.777-1.365,5.5a4.705,4.705,0,0,0,4.4,2.914,4.191,4.191,0,0,0,3.161-1.563l27.382-29.007-7.814-8.372Z"/><path d="M427.571,255.154c1.859,0,3.1,1.24,3.985,3.453,1.062-2.213,2.568-3.453,4.694-3.453h14.878a4.062,4.062,0,0,1,4.074,4.074v7.828c0,2.656-1.327,4.074-4.074,4.074-2.656,0-4.074-1.418-4.074-4.074V263.3H436.515a2.411,2.411,0,0,0-2.656,2.745v27.188h10.007c2.658,0,4.074,1.329,4.074,4.074s-1.416,4.074-4.074,4.074h-26.39c-2.659,0-3.986-1.328-3.986-4.074s1.327-4.074,3.986-4.074h8.236V263.3h-7.263c-2.656,0-3.985-1.329-3.985-4.074,0-2.658,1.329-4.074,3.985-4.074Z"/><path d="M539.233,255.154c2.656,0,4.074,1.416,4.074,4.074v34.007h10.1c2.746,0,4.074,1.329,4.074,4.074s-1.328,4.074-4.074,4.074H524.8c-2.656,0-4.074-1.328-4.074-4.074s1.418-4.074,4.074-4.074h10.362V263.3h-8.533c-2.744,0-4.073-1.329-4.073-4.074,0-2.658,1.329-4.074,4.073-4.074Zm4.22-17.615a5.859,5.859,0,1,1-5.819-5.819A5.9,5.9,0,0,1,543.453,237.539Z"/><path d="M605.143,259.228a4.589,4.589,0,0,1-.267,1.594L590,298.9a3.722,3.722,0,0,1-3.721,2.48h-5.933a3.689,3.689,0,0,1-3.808-2.48l-15.055-38.081a3.23,3.23,0,0,1-.355-1.594,4.084,4.084,0,0,1,4.164-4.074,3.8,3.8,0,0,1,3.718,2.656l14.348,36.134,13.9-36.134a3.8,3.8,0,0,1,3.72-2.656A4.084,4.084,0,0,1,605.143,259.228Z"/><path d="M390.61,255.154c5.018,0,8.206,3.312,8.206,8.4v37.831H363.308a4.813,4.813,0,0,1-5.143-4.929V283.427a8.256,8.256,0,0,1,7-8.148l25.507-3.572v-8.4H362.306a4.014,4.014,0,0,1-4.141-4.074c0-2.87,2.143-4.074,4.355-4.074Zm.059,38.081V279.942l-24.354,3.4v9.9Z"/><path d="M448.538,224.52h.077c1,.024,2.236,1.245,2.589,1.669l.023.028.024.026,46.664,50.433a3.173,3.173,0,0,1-.034,4.336l-4.893,5.2-6.876-8.134L446.652,230.4c-1.508-2.166-1.617-2.836-1.191-3.858a3.353,3.353,0,0,1,3.077-2.02m0-1.25a4.606,4.606,0,0,0-4.231,2.789c-.705,1.692-.2,2.88,1.349,5.1l39.493,47.722,7.789,9.214,5.853-6.221a4.417,4.417,0,0,0,.042-6.042L452.169,225.4s-1.713-2.08-3.524-2.124Z"/></g></svg>
    </span>
    <span class="attachment-text">
      <span class="attachment-title">Preprint</span>
      <span class="attachment-desc">Full report on arXiv</span>
    </span>
    <span class="attachment-go">
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.97 7 1.96 2 6.963-7 3.993 4v-10z"/></svg>
    </span>
  </a>
  <a class="attachment-row" href="https://er.ucu.edu.ua/items/71895a6b-30a0-4a60-a38c-6c5cf1cb8b3b" target="_blank" rel="noopener noreferrer">
    <span class="attachment-stamp">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7z"/><path d="M14 3v4h4"/><path d="M9 12.5h6"/><path d="M9 16h4"/></svg>
    </span>
    <span class="attachment-text">
      <span class="attachment-title">Report</span>
      <span class="attachment-desc">UCU institutional repository</span>
    </span>
    <span class="attachment-go">
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.97 7 1.96 2 6.963-7 3.993 4v-10z"/></svg>
    </span>
  </a>
  <a class="attachment-row" href="https://er.ucu.edu.ua/items/1061fe2f-5e4c-46df-96a2-2ec7a8f09ce9" target="_blank" rel="noopener noreferrer">
    <span class="attachment-stamp">
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <rect x="2" y="7" width="16" height="11" rx="2" opacity="0.35"/>
        <rect x="6" y="3" width="16" height="11" rx="2"/>
      </svg>
    </span>
    <span class="attachment-text">
      <span class="attachment-title">Slides</span>
      <span class="attachment-desc">Presentation slides</span>
    </span>
    <span class="attachment-go">
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.97 7 1.96 2 6.963-7 3.993 4v-10z"/></svg>
    </span>
  </a>
</div>
