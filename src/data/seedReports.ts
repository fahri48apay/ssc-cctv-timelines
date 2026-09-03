import { CCTVReport } from '../types/report';

export const INITIAL_REPORTS: CCTVReport[] = [
  {
    id: 'ssc-lp-2026-07-19',
    bulan: 'JULI',
    tahun: 2026,
    nomorLaporan: 'LP/No. 19/VII/SSC/2026',
    tanggalLaporan: 'Kamis, 16 Juli 2026',
    namaPelapor: 'Yudi Kristanto',
    nikPaspor: '3275011301820032',
    jenisKelamin: 'Laki-laki',
    pekerjaan: 'Driver',
    perusahaan: 'PT. MAP',
    noTelepon: '087876892560',
    alamat: 'Bekasi',
    lokasiCCTV: 'Lantai 3 ( Parkir casual )',
    nomorKamera: 'CCTV Lantai 3',
    viewCamera: 'View lot H3',
    hariTanggalKejadian: 'Kamis, 16 Juli 2026',
    waktuKejadian: '11:30 WIB',
    lokasiKejadian: 'Parkir Casual Lantai 3',
    kategoriKejadian: 'Kehilangan Barang',
    jenisKejadian: 'Kehilangan kunci mobil beserta dompet kunci',
    uraianSingkat: 'Pada hari Kamis 16 Juli 2026 sekitar pukul 08.30 WIB masuk ke gedung SSC, Pukul 11.30 WIB meninggalkan parkiran casual lantai 3 dengan ciri mobil Hyundai Creta hitam nopol B 2650 PIR, dan kehilangan kunci mobil beserta dompet kunci berisi STNK.',
    timeline: [
      { id: 't1', waktu: '08:17 WIB', aktivitas: 'Kendaraan terparkir di Lantai 3 Lot H3' },
      { id: 't2', waktu: '08:20 WIB', aktivitas: 'Driver keluar dari kendaraan' },
      { id: 't3', waktu: '08:23 WIB', aktivitas: 'Driver kembali ke kendaraan' },
      { id: 't4', waktu: '08:24 WIB', aktivitas: 'Driver ke belakang kendaraan' },
      { id: 't5', waktu: '08:26 WIB', aktivitas: 'Rekanan driver datang' },
      { id: 't6', waktu: '09:35 WIB', aktivitas: 'Membuka bagasi mobil' },
      { id: 't7', waktu: '10:05 WIB', aktivitas: 'Menutup kembali bagasi mobil' }
    ],
    aktivitasTerekam: 'Driver terpantau melakukan aktivitas di sekitar mobil antara pukul 08:17 hingga 10:05 WIB.',
    identitasOrangKendaraan: 'Kendaraan Mobil HYUNDAI dengan No-Pol B 2650 PIR (Hitam)',
    barangTerlibat: 'Kunci mobil Hyundai beserta dompet kunci hitam berisi STNK',
    durasiVideo: '108 Menit',
    fileRekamanCCTV: 'File rekaman telah diamankan di storage server CCTV SSC',
    temuanPenting: [
      'Kunci mobil beserta dompet kunci tidak terlihat terjatuh saat driver beraktivitas di area view CCTV',
      'Dugaan sementara kunci tertinggal atau terjatuh di dalam kabin mobil'
    ],
    dugaanPenyebab: 'Kelalaian driver saat meninggalkan kendaraan, tidak mengunci kendaraan dengan benar, dan rendahnya awareness terhadap barang berharga.',
    keterbatasanRekaman: 'Sudut pandang kamera hanya mengcover sisi luar kendaraan, bagian dalam kabin tidak terpantau.',
    ringkasanPemeriksaan: 'Berdasarkan pemeriksaan visual rekaman durasi 108 menit, tidak terindikasi adanya pihak ketiga yang mengambil kunci dari area luar parkir.',
    rekomendasiTindakLanjut: [
      'Menghimbau kepada Driver untuk memeriksa kembali sela-sela jok kabin kendaraan',
      'Meningkatkan kewaspadaan terhadap barang bawaan berharga',
      'Koordinasi dengan security pos keluar jika ada penyerahan temuan barang'
    ],
    buktiKepolisian: 'Menyertakan bukti laporan Kepolisian',
    status: 'approved',
    petugasCCTV: {
      nama: 'M. Fahri Saleh',
      jabatan: 'CCTV Staf',
      tanggal: '16/07/2026'
    },
    spvOperasional: {
      nama: 'Untung Slamet',
      jabatan: 'Spv. Operasional',
      tanggal: '16/07/2026',
      approved: true
    },
    srChiefOperasional: {
      nama: 'Ali Bambang',
      jabatan: 'Sr. Chief Operasional',
      tanggal: '17/07/2026',
      approved: true
    },
    createdAt: '2026-07-16T12:00:00.000Z',
    updatedAt: '2026-07-17T09:00:00.000Z'
  },
  {
    id: 'ssc-lp-2026-04-02',
    bulan: 'APRIL',
    tahun: 2026,
    nomorLaporan: 'LP/No. 02/IV/SSC/2026',
    tanggalLaporan: 'Jumat, 24 April 2026',
    namaPelapor: 'Ruhban Munawar',
    nikPaspor: '38403-8237464-5',
    jenisKelamin: 'Laki-laki',
    pekerjaan: 'Pengusaha',
    perusahaan: 'PT. MAP',
    noTelepon: '082312368157',
    alamat: 'Jakarta',
    lokasiCCTV: 'Lobby Utama',
    nomorKamera: 'CCTV NO 02',
    viewCamera: 'Lobby Utama Depan Drop-Off',
    hariTanggalKejadian: 'Jumat, 24 April 2026',
    waktuKejadian: '14:20 WIB',
    lokasiKejadian: 'Lobby Utama Drop-Off',
    kategoriKejadian: 'Kehilangan Barang',
    jenisKejadian: 'Hp iPhone 14 tertinggal di dalam Taxi Blue Bird',
    uraianSingkat: 'Pelapor tiba di lobby utama menggunakan taxi Blue Bird dan menyadari handphone tertinggal setelah taxi meninggalkan lobby.',
    timeline: [
      { id: 't1', waktu: '14:16 WIB', aktivitas: 'Taxi Blue Bird terpantau berhenti di depan drop-off Lobby Utama' },
      { id: 't2', waktu: '14:18 WIB', aktivitas: 'Pelapor turun dari taxi tanpa memegang handphone di tangan' },
      { id: 't3', waktu: '14:20 WIB', aktivitas: 'Taxi meninggalkan area lobby ke arah jalan raya' }
    ],
    aktivitasTerekam: 'Pelapor turun dari Taxi LL2650 di area depan lobby utama.',
    identitasOrangKendaraan: 'Kendaraan Taxi Blue Bird No Pintu LL2650',
    barangTerlibat: '1 Unit HP iPhone 14',
    durasiVideo: '15 Menit',
    fileRekamanCCTV: 'Playback internal tersimpan',
    temuanPenting: [
      'Terpantau nomor pintu taxi Blue Bird dengan jelas (LL2650)',
      'Di area lobby pelapor tidak terlihat memegang/menjatuhkan HP'
    ],
    dugaanPenyebab: 'Kelalaian pelapor saat turun dari taksi tidak memeriksa kembali barang bawaannya di kursi belakang.',
    keterbatasanRekaman: 'Tidak ada keterbatasan, nomor armada taksi terekam sangat jelas pada resolusi tinggi.',
    ringkasanPemeriksaan: 'Handphone dipastikan tertinggal di dalam kabin Taxi Blue Bird LL2650 saat turun di lobby.',
    rekomendasiTindakLanjut: [
      'Pihak security langsung menghubungi call center Blue Bird dan pool taksi terkait',
      'HP berhasil diamankan pihak Blue Bird dan diserahkan ke Chief Security pukul 16:13 WIB di Pos Jl. KH Mas Mansyur'
    ],
    buktiKepolisian: 'Harus dilampirkan LP jika proses klaim asuransi',
    status: 'approved',
    petugasCCTV: {
      nama: 'M. Fahri Saleh',
      jabatan: 'CCTV Staf',
      tanggal: '24/04/2026'
    },
    spvOperasional: {
      nama: 'Untung Slamet',
      jabatan: 'Spv. Operasional',
      tanggal: '24/04/2026',
      approved: true
    },
    srChiefOperasional: {
      nama: 'Ali Bambang',
      jabatan: 'Sr. Chief Operasional',
      tanggal: '24/04/2026',
      approved: true
    },
    createdAt: '2026-04-24T15:00:00.000Z',
    updatedAt: '2026-04-24T17:00:00.000Z'
  },
  {
    id: 'ssc-lp-2026-05-01',
    bulan: 'MEI',
    tahun: 2026,
    nomorLaporan: 'LP/No. 01/V/SSC/2026',
    tanggalLaporan: 'Senin, 04 Mei 2026',
    namaPelapor: 'Dea Irawan',
    jenisKelamin: 'Laki-laki',
    pekerjaan: 'Driver Vendor',
    perusahaan: 'PT. MAP (Starbucks)',
    lokasiCCTV: 'Lantai 3 Lot H5',
    nomorKamera: 'CCTV NO 13',
    viewCamera: 'Parkir Lantai 3',
    hariTanggalKejadian: 'Senin, 04 Mei 2026',
    waktuKejadian: '20:17 WIB',
    lokasiKejadian: 'Lantai 3 lot H5',
    kategoriKejadian: 'Kerusakan / Senggolan Kendaraan',
    jenisKejadian: 'Bemper Baret sisi Kanan mobil BMW akibat tersenggol Avanza',
    uraianSingkat: 'Mobil Avanza vendor hendak keluar parkir namun bermanuver terlalu mepet sehingga menggores bemper mobil BMW di sampingnya, lalu meninggalkan lokasi.',
    timeline: [
      { id: 't1', waktu: '20:15 WIB', aktivitas: 'Mobil Avanza menyalakan mesin hendak keluar dari slot parkir' },
      { id: 't2', waktu: '20:17 WIB', aktivitas: 'Manuver mobil Avanza terlalu mepet ke kiri hingga terjadi gesekan pada bemper BMW' },
      { id: 't3', waktu: '20:18 WIB', aktivitas: 'Setelah menyerempet kendaraan BMW, kendaraan Avanza langsung meninggalkan lokasi kejadian' }
    ],
    aktivitasTerekam: 'Terlihat proses manuver keluarnya mobil Avanza hingga menyenggol mobil BMW.',
    identitasOrangKendaraan: 'Mobil Avanza Putih (Driver Vendor PT MAP) & Mobil BMW Hitam',
    barangTerlibat: 'Goresan disisi kiri bamper mobil BMW',
    durasiVideo: '25 Detik',
    fileRekamanCCTV: 'Rekaman diekstrak untuk mediasi internal',
    temuanPenting: [
      'Driver Avanza terlalu mepet saat berbelok keluar slot parkir',
      'Kendaraan teridentifikasi sebagai vendor rekanan PT. MAP'
    ],
    dugaanPenyebab: 'Lalai dalam berkendara dan kurang memperhitungkan ruang putar saat parkir.',
    keterbatasanRekaman: 'Rekaman jelas, tidak ada blind spot.',
    ringkasanPemeriksaan: 'Pemeriksaan CCTV membuktikan benturan diakibatkan manuver kendaraan Avanza vendor.',
    rekomendasiTindakLanjut: [
      'Pihak Security memanggil driver Avanza vendor untuk dimediasi',
      'Mediasi berhasil disepakati damai dengan kesediaan driver Avanza memperbaiki baret pada bemper BMW'
    ],
    buktiKepolisian: 'Diselesaikan secara mediasi kekeluargaan / damai',
    status: 'approved',
    petugasCCTV: {
      nama: 'M. Fahri Saleh',
      jabatan: 'CCTV Staf',
      tanggal: '04/05/2026'
    },
    spvOperasional: {
      nama: 'Untung Slamet',
      jabatan: 'Spv. Operasional',
      tanggal: '04/05/2026',
      approved: true
    },
    srChiefOperasional: {
      nama: 'Ali Bambang',
      jabatan: 'Sr. Chief Operasional',
      tanggal: '05/05/2026',
      approved: true
    },
    createdAt: '2026-05-04T21:00:00.000Z',
    updatedAt: '2026-05-05T10:00:00.000Z'
  },
  {
    id: 'ssc-lp-2026-07-21',
    bulan: 'JULI',
    tahun: 2026,
    nomorLaporan: 'LP/No. 21/VII/SSC/2026',
    tanggalLaporan: 'Jumat, 24 Juli 2026',
    namaPelapor: 'Yuda Herlambang',
    pekerjaan: 'Tenant',
    lokasiCCTV: 'Lantai Ground / Pintu Keluar KH Mas Mansyur',
    nomorKamera: 'CCTV GF No. 01 & No. 07',
    viewCamera: 'Ram casual dan ram turun basement',
    hariTanggalKejadian: 'Jumat, 24 Juli 2026',
    waktuKejadian: '11:38 WIB',
    lokasiKejadian: 'Jalur lalu lintas pintu keluar Jl. KH. Mas Mansyur',
    kategoriKejadian: 'Kerusakan / Senggolan Kendaraan',
    jenisKejadian: 'Kendaraan Yaris Cross ditabrak dari belakang oleh Avanza',
    timeline: [
      { id: 't1', waktu: '11:37 WIB', aktivitas: 'Yaris Cross merapat dan mengantri di jalur pintu keluar' },
      { id: 't2', waktu: '11:38 WIB', aktivitas: 'Avanza nopol B 1741 VUA menabrak bagian belakang Yaris Cross nopol B 1106 DOC' }
    ],
    aktivitasTerekam: 'Terpantau antrian keluar dan benturan belakang saat mobil depan melambat.',
    identitasOrangKendaraan: 'Yaris Cross (B 1106 DOC) & Avanza Putih (B 1741 VUA)',
    barangTerlibat: 'Bumper belakang Yaris Cross & Bumper depan Avanza',
    durasiVideo: '46 Detik',
    fileRekamanCCTV: 'File rekaman untuk mitigasi dan observasi',
    temuanPenting: [
      'Kendaraan Avanza tidak menjaga jarak aman saat antrian keluar pintu tiket',
      'Sudut kamera sempat terhalang sebagian oleh bodi kendaraan di belakang'
    ],
    dugaanPenyebab: 'Kelalaian driver Avanza tidak menjaga jarak pengereman.',
    keterbatasanRekaman: '2 titik kamera view ram casual dan ram turun ke basement terdapat blind spot sudut rendah.',
    ringkasanPemeriksaan: 'Terbukti terjadi tabrakan belakang murni akibat kelalaian kendaraan belakang.',
    rekomendasiTindakLanjut: [
      'Security mengamankan kedua pihak dan memfasilitasi asuransi klaim pihak ketiga',
      'Rekomendasi penambahan cermin cembung atau penyesuaian sudut kamera GF-01'
    ],
    buktiKepolisian: 'Laporan Kepolisian untuk klaim asuransi Jasa Raharja/Komersil',
    status: 'approved',
    petugasCCTV: {
      nama: 'M. Fahri Saleh',
      jabatan: 'CCTV Staf',
      tanggal: '24/07/2026'
    },
    spvOperasional: {
      nama: 'Untung Slamet',
      jabatan: 'Spv. Operasional',
      tanggal: '24/07/2026',
      approved: true
    },
    srChiefOperasional: {
      nama: 'Ali Bambang',
      jabatan: 'Sr. Chief Operasional',
      tanggal: '25/07/2026',
      approved: true
    },
    createdAt: '2026-07-24T13:00:00.000Z',
    updatedAt: '2026-07-25T08:30:00.000Z'
  },
  {
    id: 'ssc-lp-2026-08-03',
    bulan: 'AGUSTUS',
    tahun: 2026,
    nomorLaporan: 'LP/No. 03/VIII/SSC/2026',
    tanggalLaporan: 'Kamis, 06 Agustus 2026',
    namaPelapor: 'M. Faisal',
    perusahaan: 'Tenant SSC',
    lokasiCCTV: 'GF / Starbucks',
    nomorKamera: 'CCTV GF/Starbucks No. 07',
    viewCamera: 'Selasar Starbucks & Parkir VIP AIS',
    hariTanggalKejadian: 'Senin, 03 Agustus 2026',
    waktuKejadian: '12:05 WIB',
    lokasiKejadian: 'Parkir VIP sisi AIS (Pintu keluar Jln. Mas Mansyur)',
    kategoriKejadian: 'Kerusakan / Senggolan Kendaraan',
    jenisKejadian: 'Mobil Denza mundur membentur pembatas taman',
    timeline: [
      { id: 't1', waktu: '12:00 WIB', aktivitas: 'Mobil Denza B 3281 JNU merapat ke area parkir VIP sisi AIS' },
      { id: 't2', waktu: '12:02 WIB', aktivitas: 'Petugas Security Imron memandu parkir' },
      { id: 't3', waktu: '12:05 WIB', aktivitas: 'Driver memundurkan kendaraan melampaui batas hingga membentur pot pembatas taman' }
    ],
    aktivitasTerekam: 'Aktivitas parkir mundur kendaraan Denza di area VIP.',
    identitasOrangKendaraan: 'Mobil Denza Hitam No. POL B 3281 JNU & Petugas Security Imron',
    barangTerlibat: 'Bumper belakang Denza & Pembatas taman SSC',
    durasiVideo: '2 Menit 8 Detik',
    fileRekamanCCTV: 'Tersimpan di server CCTV',
    temuanPenting: [
      'Kendaraan mundur terlalu kencang saat hendak meluruskan posisi parkir'
    ],
    dugaanPenyebab: 'Kelalaian driver tidak memperhatikan aba-aba juru parkir.',
    keterbatasanRekaman: 'Bagian bawah pot tanaman terhalang bayangan/blind spot sudut rendah.',
    ringkasanPemeriksaan: 'Benturan terjadi murni akibat kesalahan kemudi driver saat mundur.',
    rekomendasiTindakLanjut: [
      'Menghimbau driver agar lebih berhati-hati saat parkir mundur di area VIP',
      'Pemeriksaan tidak ada kerusakan struktural pada pembatas taman'
    ],
    status: 'approved',
    petugasCCTV: {
      nama: 'M. Fahri Saleh',
      jabatan: 'CCTV Staf',
      tanggal: '06/08/2026'
    },
    spvOperasional: {
      nama: 'Untung Slamet',
      jabatan: 'Spv. Operasional',
      tanggal: '06/08/2026',
      approved: true
    },
    srChiefOperasional: {
      nama: 'Ali Bambang',
      jabatan: 'Sr. Chief Operasional',
      tanggal: '07/08/2026',
      approved: true
    },
    createdAt: '2026-08-06T14:00:00.000Z',
    updatedAt: '2026-08-07T09:00:00.000Z'
  },
  {
    id: 'ssc-lp-2026-08-11',
    bulan: 'AGUSTUS',
    tahun: 2026,
    nomorLaporan: 'LP/No. 11/VIII/SSC/2026',
    tanggalLaporan: 'Senin, 24 Agustus 2026',
    namaPelapor: 'Gusti Gerald Maxie',
    perusahaan: 'PT. Siregar Setiawan Manalu Partner',
    alamat: 'Lantai 17 SSC',
    lokasiCCTV: 'Lantai 17 Koridor Shaft',
    nomorKamera: 'CCTV Koridor Shaft Lt 17 No. 11',
    viewCamera: 'Koridor Depan Toilet Lantai 17',
    hariTanggalKejadian: 'Senin, 24 Agustus 2026',
    waktuKejadian: '10:14 WIB',
    lokasiKejadian: 'Toilet Pria Lantai 17',
    kategoriKejadian: 'Kehilangan Barang',
    jenisKejadian: 'Kehilangan HP iPhone 15 Hitam di Toilet Lantai 17',
    timeline: [
      { id: 't1', waktu: '10:14 WIB', aktivitas: 'Bapak Gusti mengenakan kemeja putih masuk ke toilet pria dengan membawa HP digenggam tangan kanan' },
      { id: 't2', waktu: '10:19 WIB', aktivitas: 'Bapak Gusti keluar dari toilet tanpa memegang HP di tangan' },
      { id: 't3', waktu: '10:28 WIB', aktivitas: 'Bapak Gusti kembali ke toilet untuk mencari HP yang tertinggal' }
    ],
    aktivitasTerekam: 'Terpantau pelapor membawa HP saat masuk toilet dan tidak membawa saat keluar.',
    identitasOrangKendaraan: 'Bapak Gusti Gerald Maxie (Tenant Lantai 17)',
    barangTerlibat: 'Handphone jenis iPhone 15 Warna Hitam',
    durasiVideo: '30 Detik',
    fileRekamanCCTV: 'Rekaman koridor shaft tersimpan',
    temuanPenting: [
      'Pelapor terkonfirmasi membawa HP saat masuk toilet',
      'Saat keluar toilet HP tidak tampak di tangan pelapor'
    ],
    dugaanPenyebab: 'Kelalaian pelapor meletakkan barang pribadi di atas wastafel/bilik toilet.',
    keterbatasanRekaman: 'Area dalam bilik dan wastafel toilet tidak dipasang CCTV demi privasi penghuni gedung.',
    ringkasanPemeriksaan: 'HP tertinggal di dalam area toilet; petugas cleaning service yang bertugas telah ditanyai untuk pencarian.',
    rekomendasiTindakLanjut: [
      'Menghimbau penghuni gedung untuk tidak meletakkan barang berharga sembarangan di area publik toilet',
      'Security mengamankan log rekaman jika ada tindak lanjut kepolisian'
    ],
    status: 'submitted',
    petugasCCTV: {
      nama: 'M. Fahri Saleh',
      jabatan: 'CCTV Staf',
      tanggal: '24/08/2026'
    },
    spvOperasional: {
      nama: 'Untung Slamet',
      jabatan: 'Spv. Operasional',
      tanggal: '24/08/2026',
      approved: false
    },
    srChiefOperasional: {
      nama: 'Ali Bambang',
      jabatan: 'Sr. Chief Operasional',
      tanggal: '24/08/2026',
      approved: false
    },
    createdAt: '2026-08-24T11:00:00.000Z',
    updatedAt: '2026-08-24T11:00:00.000Z'
  }
];
