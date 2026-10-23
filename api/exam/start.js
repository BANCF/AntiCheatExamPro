// Pre-bundled Vercel Serverless Function (AntiCheatExamPro)


// api_src/_storage.ts
import { Redis } from "@upstash/redis";

// src/data/defaultQuestionBank.ts
var DEFAULT_QUESTION_BANK = [
  {
    "id": "q_tin7_1",
    "type": "single_choice",
    "prompt": "Thi\u1EBFt b\u1ECB v\xE0o - ra \u0111\xF3ng vai tr\xF2 g\xEC trong h\u1EC7 th\u1ED1ng m\xE1y t\xEDnh?",
    "options": [
      {
        "id": "opt_1_a",
        "text": "Ch\u1EC9 x\u1EED l\xED d\u1EEF li\u1EC7u b\xEAn trong m\xE1y t\xEDnh.",
        "is_correct": false
      },
      {
        "id": "opt_1_b",
        "text": "Gi\xFAp m\xE1y t\xEDnh trao \u0111\u1ED5i d\u1EEF li\u1EC7u v\u1EDBi th\u1EBF gi\u1EDBi b\xEAn ngo\xE0i.",
        "is_correct": true
      },
      {
        "id": "opt_1_c",
        "text": "Ch\u1EC9 cung c\u1EA5p ngu\u1ED3n \u0111i\u1EC7n cho m\xE1y t\xEDnh.",
        "is_correct": false
      },
      {
        "id": "opt_1_d",
        "text": "\u0110i\u1EC1u khi\u1EC3n to\xE0n b\u1ED9 ho\u1EA1t \u0111\u1ED9ng c\u1EE7a ph\u1EA7n m\u1EC1m.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_1_thiet_bi_vao_ra",
      "phan_cung"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_2",
    "type": "single_choice",
    "prompt": "Thi\u1EBFt b\u1ECB n\xE0o sau \u0111\xE2y d\xF9ng \u0111\u1EC3 ti\u1EBFp nh\u1EADn th\xF4ng tin v\xE0 chuy\u1EC3n v\xE0o m\xE1y t\xEDnh (thi\u1EBFt b\u1ECB v\xE0o)?",
    "options": [
      {
        "id": "opt_2_a",
        "text": "B\xE0n ph\xEDm, chu\u1ED9t, micro.",
        "is_correct": true
      },
      {
        "id": "opt_2_b",
        "text": "M\xE0n h\xECnh, m\xE1y in, loa.",
        "is_correct": false
      },
      {
        "id": "opt_2_c",
        "text": "B\u1ED9 x\u1EED l\xED trung t\xE2m (CPU).",
        "is_correct": false
      },
      {
        "id": "opt_2_d",
        "text": "M\xE1y chi\u1EBFu, tai nghe.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_1_thiet_bi_vao_ra",
      "phan_cung"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_3",
    "type": "single_choice",
    "prompt": "Thi\u1EBFt b\u1ECB n\xE0o sau \u0111\xE2y nh\u1EADn th\xF4ng tin t\u1EEB m\xE1y t\xEDnh \u0111\u01B0a ra b\xEAn ngo\xE0i (thi\u1EBFt b\u1ECB ra)?",
    "options": [
      {
        "id": "opt_3_a",
        "text": "Chu\u1ED9t, b\xE0n ph\xEDm.",
        "is_correct": false
      },
      {
        "id": "opt_3_b",
        "text": "M\xE1y in, loa, m\xE0n h\xECnh.",
        "is_correct": true
      },
      {
        "id": "opt_3_c",
        "text": "Micro, m\xE1y qu\xE9t.",
        "is_correct": false
      },
      {
        "id": "opt_3_d",
        "text": "\u1ED4 \u0111\u0129a c\u1EE9ng.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_1_thiet_bi_vao_ra",
      "phan_cung"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_4",
    "type": "single_choice",
    "prompt": "M\xE1y chi\u1EBFu thu\u1ED9c lo\u1EA1i thi\u1EBFt b\u1ECB n\xE0o?",
    "options": [
      {
        "id": "opt_4_a",
        "text": "Thi\u1EBFt b\u1ECB v\xE0o.",
        "is_correct": false
      },
      {
        "id": "opt_4_b",
        "text": "Thi\u1EBFt b\u1ECB ra.",
        "is_correct": true
      },
      {
        "id": "opt_4_c",
        "text": "Thi\u1EBFt b\u1ECB l\u01B0u tr\u1EEF.",
        "is_correct": false
      },
      {
        "id": "opt_4_d",
        "text": "Thi\u1EBFt b\u1ECB x\u1EED l\xED.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_1_thiet_bi_vao_ra",
      "phan_cung"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_5",
    "type": "single_choice",
    "prompt": "Micro l\xE0m vi\u1EC7c v\u1EDBi d\u1EA1ng th\xF4ng tin n\xE0o?",
    "options": [
      {
        "id": "opt_5_a",
        "text": "V\u0103n b\u1EA3n.",
        "is_correct": false
      },
      {
        "id": "opt_5_b",
        "text": "H\xECnh \u1EA3nh.",
        "is_correct": false
      },
      {
        "id": "opt_5_c",
        "text": "\xC2m thanh.",
        "is_correct": true
      },
      {
        "id": "opt_5_d",
        "text": "Video.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_1_thiet_bi_vao_ra",
      "phan_cung"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_6",
    "type": "single_choice",
    "prompt": "Thi\u1EBFt b\u1ECB n\xE0o v\u1EEBa l\xE0 thi\u1EBFt b\u1ECB v\xE0o v\u1EEBa l\xE0 thi\u1EBFt b\u1ECB ra?",
    "options": [
      {
        "id": "opt_6_a",
        "text": "M\xE0n h\xECnh m\xE1y t\xEDnh th\xF4ng th\u01B0\u1EDDng.",
        "is_correct": false
      },
      {
        "id": "opt_6_b",
        "text": "B\xE0n ph\xEDm.",
        "is_correct": false
      },
      {
        "id": "opt_6_c",
        "text": "M\xE0n h\xECnh c\u1EA3m \u1EE9ng (touch screen).",
        "is_correct": true
      },
      {
        "id": "opt_6_d",
        "text": "Loa th\u01B0\u1EDDng.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_1_thiet_bi_vao_ra",
      "phan_cung"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_7",
    "type": "single_choice",
    "prompt": "T\u1EA5m c\u1EA3m \u1EE9ng (touchpad) tr\xEAn m\xE1y t\xEDnh x\xE1ch tay c\xF3 ch\u1EE9c n\u0103ng gi\u1ED1ng v\u1EDBi thi\u1EBFt b\u1ECB n\xE0o?",
    "options": [
      {
        "id": "opt_7_a",
        "text": "M\xE0n h\xECnh.",
        "is_correct": false
      },
      {
        "id": "opt_7_b",
        "text": "Chu\u1ED9t m\xE1y t\xEDnh.",
        "is_correct": true
      },
      {
        "id": "opt_7_c",
        "text": "B\xE0n ph\xEDm.",
        "is_correct": false
      },
      {
        "id": "opt_7_d",
        "text": "M\xE1y in.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_1_thiet_bi_vao_ra",
      "phan_cung"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_8",
    "type": "single_choice",
    "prompt": "Thao t\xE1c n\xE0o sau \u0111\xE2y l\xE0 thao t\xE1c t\u1EAFt m\xE1y t\xEDnh an to\xE0n, \u0111\xFAng c\xE1ch?",
    "options": [
      {
        "id": "opt_8_a",
        "text": "R\xFAt ph\xEDch c\u1EAFm \u0111i\u1EC7n \u0111\u1ED9t ng\u1ED9t.",
        "is_correct": false
      },
      {
        "id": "opt_8_b",
        "text": "Nh\u1EA5n gi\u1EEF n\xFAt ngu\u1ED3n (Power) v\xE0i gi\xE2y.",
        "is_correct": false
      },
      {
        "id": "opt_8_c",
        "text": "S\u1EED d\u1EE5ng n\xFAt l\u1EC7nh Shut down c\u1EE7a h\u1EC7 \u0111i\u1EC1u h\xE0nh.",
        "is_correct": true
      },
      {
        "id": "opt_8_d",
        "text": "T\u1EAFt c\xF4ng t\u1EAFc m\xE0n h\xECnh r\u1ED3i r\xFAt \u0111i\u1EC7n.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_1_thiet_bi_vao_ra",
      "phan_cung"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_9",
    "type": "single_choice",
    "prompt": "\u0110\u1EC3 \u0111\u1EA3m b\u1EA3o an to\xE0n \u0111i\u1EC7n v\xE0 tr\xE1nh h\u1ECFng thi\u1EBFt b\u1ECB, vi\u1EC7c k\u1EBFt n\u1ED1i d\xE2y ngu\u1ED3n cho m\xE1y t\xEDnh n\xEAn \u0111\u01B0\u1EE3c th\u1EF1c hi\u1EC7n khi n\xE0o?",
    "options": [
      {
        "id": "opt_9_a",
        "text": "Tr\u01B0\u1EDBc khi c\u1EAFm t\u1EA5t c\u1EA3 c\xE1c thi\u1EBFt b\u1ECB kh\xE1c.",
        "is_correct": false
      },
      {
        "id": "opt_9_b",
        "text": "C\u1EAFm \u0111an xen trong qu\xE1 tr\xECnh k\u1EBFt n\u1ED1i c\xE1c thi\u1EBFt b\u1ECB.",
        "is_correct": false
      },
      {
        "id": "opt_9_c",
        "text": "Sau khi \u0111\xE3 k\u1EBFt n\u1ED1i c\xE1c thi\u1EBFt b\u1ECB (chu\u1ED9t, b\xE0n ph\xEDm, m\xE0n h\xECnh...) xong.",
        "is_correct": true
      },
      {
        "id": "opt_9_d",
        "text": "Ch\u1EC9 c\u1EA7n c\u1EAFm d\xE2y ngu\u1ED3n, kh\xF4ng c\u1EA7n quan t\xE2m th\u1EE9 t\u1EF1.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_1_thiet_bi_vao_ra",
      "phan_cung"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_10",
    "type": "single_choice",
    "prompt": "N\u1EBFu c\u1ED1 g\u1EAFng c\u1EAFm \u0111\u1EA7u n\u1ED1i d\xE2y m\xE0n h\xECnh v\xE0o sai c\u1ED5ng, h\u1EADu qu\u1EA3 c\xF3 th\u1EC3 l\xE0 g\xEC?",
    "options": [
      {
        "id": "opt_10_a",
        "text": "M\xE0n h\xECnh s\u1EBD hi\u1EC3n th\u1ECB \u0111\u1EB9p h\u01A1n.",
        "is_correct": false
      },
      {
        "id": "opt_10_b",
        "text": "M\xE1y t\xEDnh t\u1EF1 \u0111\u1ED9ng \u0111i\u1EC1u ch\u1EC9nh cho ph\xF9 h\u1EE3p.",
        "is_correct": false
      },
      {
        "id": "opt_10_c",
        "text": "S\u1EBD kh\xF4ng l\u1EAFp \u0111\u01B0\u1EE3c ho\u1EB7c c\xF3 th\u1EC3 l\xE0m h\u1ECFng \u0111\u1EA7u n\u1ED1i.",
        "is_correct": true
      },
      {
        "id": "opt_10_d",
        "text": "M\xE1y t\xEDnh t\u1EF1 \u0111\u1ED9ng t\u1EAFt ngu\u1ED3n.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_1_thiet_bi_vao_ra",
      "phan_cung"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_11",
    "type": "single_choice",
    "prompt": "Vi\u1EC7c l\xE0m n\xE0o sau \u0111\xE2y KH\xD4NG N\xCAN th\u1EF1c hi\u1EC7n khi s\u1EED d\u1EE5ng m\xE1y t\xEDnh?",
    "options": [
      {
        "id": "opt_11_a",
        "text": "Gi\u1EEF b\xE0n tay kh\xF4, s\u1EA1ch khi d\xF9ng m\xE1y t\xEDnh.",
        "is_correct": false
      },
      {
        "id": "opt_11_b",
        "text": "\u0110\u1EC3 \u0111\u1ED3 u\u1ED1ng g\u1EA7n chu\u1ED9t, b\xE0n ph\xEDm.",
        "is_correct": true
      },
      {
        "id": "opt_11_c",
        "text": "\u0110\u1ECDc k\u0129 h\u01B0\u1EDBng d\u1EABn s\u1EED d\u1EE5ng thi\u1EBFt b\u1ECB.",
        "is_correct": false
      },
      {
        "id": "opt_11_d",
        "text": "G\xF5 ph\xEDm d\u1EE9t kho\xE1t nh\u01B0ng nh\u1EB9 nh\xE0ng.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_1_thiet_bi_vao_ra",
      "phan_cung"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_12",
    "type": "single_choice",
    "prompt": "T\u1EA1i sao kh\xF4ng n\xEAn ch\u1EA1m v\xE0o ph\u1EA7n kim lo\u1EA1i c\u1EE7a m\xE1y t\xEDnh khi \u0111ang c\u1EAFm \u0111i\u1EC7n ho\u1EB7c lau d\u1ECDn ch\u01B0a r\xFAt \u0111i\u1EC7n?",
    "options": [
      {
        "id": "opt_12_a",
        "text": "L\xE0m tr\u1EA7y x\u01B0\u1EDBc m\xE1y t\xEDnh.",
        "is_correct": false
      },
      {
        "id": "opt_12_b",
        "text": "D\u1EC5 g\xE2y ra gi\u1EADt \u0111i\u1EC7n, kh\xF4ng an to\xE0n.",
        "is_correct": true
      },
      {
        "id": "opt_12_c",
        "text": "L\xE0m m\xE1y t\xEDnh ch\u1EA1y ch\u1EADm \u0111i.",
        "is_correct": false
      },
      {
        "id": "opt_12_d",
        "text": "L\xE0m m\u1EA5t d\u1EEF li\u1EC7u trong m\xE1y.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_1_thiet_bi_vao_ra",
      "phan_cung"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_13",
    "type": "single_choice",
    "prompt": "H\u1EC7 \u0111i\u1EC1u h\xE0nh l\xE0 g\xEC?",
    "options": [
      {
        "id": "opt_13_a",
        "text": "L\xE0 m\u1ED9t lo\u1EA1i thi\u1EBFt b\u1ECB ph\u1EA7n c\u1EE9ng c\u1EE7a m\xE1y t\xEDnh.",
        "is_correct": false
      },
      {
        "id": "opt_13_b",
        "text": "L\xE0 ph\u1EA7n m\u1EC1m \u1EE9ng d\u1EE5ng d\xF9ng \u0111\u1EC3 g\xF5 v\u0103n b\u1EA3n.",
        "is_correct": false
      },
      {
        "id": "opt_13_c",
        "text": "L\xE0 ph\u1EA7n m\u1EC1m h\u1EC7 th\u1ED1ng qu\u1EA3n l\xED, \u0111i\u1EC1u khi\u1EC3n ho\u1EA1t \u0111\u1ED9ng chung c\u1EE7a m\xE1y t\xEDnh v\xE0 qu\u1EA3n l\xED d\u1EEF li\u1EC7u.",
        "is_correct": true
      },
      {
        "id": "opt_13_d",
        "text": "L\xE0 trang web d\xF9ng \u0111\u1EC3 t\xECm ki\u1EBFm th\xF4ng tin.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_2_phan_mem_may_tinh",
      "he_dieu_hanh"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_14",
    "type": "single_choice",
    "prompt": "Ph\u1EA7n m\u1EC1m n\xE0o sau \u0111\xE2y L\xC0 m\u1ED9t h\u1EC7 \u0111i\u1EC1u h\xE0nh?",
    "options": [
      {
        "id": "opt_14_a",
        "text": "Microsoft Word.",
        "is_correct": false
      },
      {
        "id": "opt_14_b",
        "text": "Windows 10.",
        "is_correct": true
      },
      {
        "id": "opt_14_c",
        "text": "Google Chrome.",
        "is_correct": false
      },
      {
        "id": "opt_14_d",
        "text": "Zalo.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_2_phan_mem_may_tinh",
      "he_dieu_hanh"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_15",
    "type": "single_choice",
    "prompt": "Ch\u1EE9c n\u0103ng n\xE0o sau \u0111\xE2y KH\xD4NG ph\u1EA3i l\xE0 ch\u1EE9c n\u0103ng c\u01A1 b\u1EA3n c\u1EE7a h\u1EC7 \u0111i\u1EC1u h\xE0nh?",
    "options": [
      {
        "id": "opt_15_a",
        "text": "Qu\u1EA3n l\xED c\xE1c thi\u1EBFt b\u1ECB v\xE0 d\u1EEF li\u1EC7u c\u1EE7a m\xE1y t\xEDnh.",
        "is_correct": false
      },
      {
        "id": "opt_15_b",
        "text": "Cung c\u1EA5p m\xF4i tr\u01B0\u1EDDng trao \u0111\u1ED5i th\xF4ng tin (giao di\u1EC7n) gi\u1EEFa ng\u01B0\u1EDDi v\xE0 m\xE1y.",
        "is_correct": false
      },
      {
        "id": "opt_15_c",
        "text": "Tr\u1EF1c ti\u1EBFp ch\u1EC9nh s\u1EEDa hi\u1EC7u \u1EE9ng c\u1EE7a m\u1ED9t b\u1EE9c \u1EA3nh ngh\u1EC7 thu\u1EADt.",
        "is_correct": true
      },
      {
        "id": "opt_15_d",
        "text": "Cung c\u1EA5p m\xF4i tr\u01B0\u1EDDng cho ph\xE9p ch\u1EA1y c\xE1c ph\u1EA7n m\u1EC1m \u1EE9ng d\u1EE5ng.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_2_phan_mem_may_tinh",
      "he_dieu_hanh"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_16",
    "type": "single_choice",
    "prompt": "Ph\u1EA7n m\u1EC1m \u1EE9ng d\u1EE5ng c\xF3 \u0111\u1EB7c \u0111i\u1EC3m g\xEC?",
    "options": [
      {
        "id": "opt_16_a",
        "text": "Qu\u1EA3n l\xED ph\u1EA7n c\u1EE9ng m\xE1y t\xEDnh tr\u1EF1c ti\u1EBFp.",
        "is_correct": false
      },
      {
        "id": "opt_16_b",
        "text": "Gi\xFAp con ng\u01B0\u1EDDi th\u1EF1c hi\u1EC7n nh\u1EEFng c\xF4ng vi\u1EC7c c\u1EE5 th\u1EC3 (so\u1EA1n v\u0103n b\u1EA3n, nghe nh\u1EA1c...).",
        "is_correct": true
      },
      {
        "id": "opt_16_c",
        "text": "Ph\u1EA3i c\xE0i \u0111\u1EB7t \u0111\u1EA7u ti\xEAn \u0111\u1EC3 m\xE1y t\xEDnh ho\u1EA1t \u0111\u1ED9ng \u0111\u01B0\u1EE3c.",
        "is_correct": false
      },
      {
        "id": "opt_16_d",
        "text": "L\xE0 ph\u1EA7n m\u1EC1m kh\xF4ng bao gi\u1EDD b\u1ECB l\u1ED7i.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_2_phan_mem_may_tinh",
      "he_dieu_hanh"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_17",
    "type": "single_choice",
    "prompt": "M\u1ED1i quan h\u1EC7 gi\u1EEFa h\u1EC7 \u0111i\u1EC1u h\xE0nh v\xE0 ph\u1EA7n m\u1EC1m \u1EE9ng d\u1EE5ng l\xE0 g\xEC?",
    "options": [
      {
        "id": "opt_17_a",
        "text": "Ph\u1EA7n m\u1EC1m \u1EE9ng d\u1EE5ng ch\u1EA1y trong m\xF4i tr\u01B0\u1EDDng do h\u1EC7 \u0111i\u1EC1u h\xE0nh t\u1EA1o ra.",
        "is_correct": true
      },
      {
        "id": "opt_17_b",
        "text": "H\u1EC7 \u0111i\u1EC1u h\xE0nh ch\u1EA1y b\xEAn trong ph\u1EA7n m\u1EC1m \u1EE9ng d\u1EE5ng.",
        "is_correct": false
      },
      {
        "id": "opt_17_c",
        "text": "C\u1EA3 hai ho\u1EA1t \u0111\u1ED9ng \u0111\u1ED9c l\u1EADp, kh\xF4ng li\xEAn quan \u0111\u1EBFn nhau.",
        "is_correct": false
      },
      {
        "id": "opt_17_d",
        "text": "Ph\u1EA7n m\u1EC1m \u1EE9ng d\u1EE5ng c\xF3 ch\u1EE9c n\u0103ng \u0111i\u1EC1u khi\u1EC3n h\u1EC7 \u0111i\u1EC1u h\xE0nh.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_2_phan_mem_may_tinh",
      "he_dieu_hanh"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_18",
    "type": "single_choice",
    "prompt": "T\u1EC7p c\xF3 ph\u1EA7n m\u1EDF r\u1ED9ng '.docx' ho\u1EB7c '.doc' th\u01B0\u1EDDng ch\u1EE9a d\u1EEF li\u1EC7u thu\u1ED9c lo\u1EA1i n\xE0o?",
    "options": [
      {
        "id": "opt_18_a",
        "text": "\xC2m thanh.",
        "is_correct": false
      },
      {
        "id": "opt_18_b",
        "text": "H\xECnh \u1EA3nh.",
        "is_correct": false
      },
      {
        "id": "opt_18_c",
        "text": "V\u0103n b\u1EA3n.",
        "is_correct": true
      },
      {
        "id": "opt_18_d",
        "text": "Video.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_3_quan_li_du_lieu",
      "tep_va_thu_muc"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_19",
    "type": "single_choice",
    "prompt": "\u0110\u1EC3 nh\u1EADn bi\u1EBFt m\u1ED9t t\u1EC7p thu\u1ED9c lo\u1EA1i g\xEC v\xE0 d\xF9ng ph\u1EA7n m\u1EC1m n\xE0o \u0111\u1EC3 m\u1EDF, h\u1EC7 \u0111i\u1EC1u h\xE0nh th\u01B0\u1EDDng d\u1EF1a v\xE0o \u0111\xE2u?",
    "options": [
      {
        "id": "opt_19_a",
        "text": "K\xEDch th\u01B0\u1EDBc c\u1EE7a t\u1EC7p.",
        "is_correct": false
      },
      {
        "id": "opt_19_b",
        "text": "Ng\xE0y t\u1EA1o t\u1EC7p.",
        "is_correct": false
      },
      {
        "id": "opt_19_c",
        "text": "Ph\u1EA7n m\u1EDF r\u1ED9ng c\u1EE7a t\xEAn t\u1EC7p.",
        "is_correct": true
      },
      {
        "id": "opt_19_d",
        "text": "T\xEAn ng\u01B0\u1EDDi t\u1EA1o ra t\u1EC7p.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_3_quan_li_du_lieu",
      "tep_va_thu_muc"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_20",
    "type": "single_choice",
    "prompt": "T\u1EC7p n\xE0o sau \u0111\xE2y c\xF3 th\u1EC3 l\xE0 m\u1ED9t t\u1EC7p h\xECnh \u1EA3nh?",
    "options": [
      {
        "id": "opt_20_a",
        "text": "Baicacao.mp3",
        "is_correct": false
      },
      {
        "id": "opt_20_b",
        "text": "PhaoHoa.jpg",
        "is_correct": true
      },
      {
        "id": "opt_20_c",
        "text": "TapLamVan.doc",
        "is_correct": false
      },
      {
        "id": "opt_20_d",
        "text": "Game.exe",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_3_quan_li_du_lieu",
      "tep_va_thu_muc"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_21",
    "type": "single_choice",
    "prompt": "T\u1EA1i sao n\xEAn ph\xE2n lo\u1EA1i d\u1EEF li\u1EC7u v\xE0 l\u01B0u tr\u1EEF theo tr\u1EADt t\u1EF1 th\u01B0 m\u1EE5c, \u0111\u1EB7t t\xEAn r\xF5 r\xE0ng?",
    "options": [
      {
        "id": "opt_21_a",
        "text": "\u0110\u1EC3 m\xE1y t\xEDnh ch\u1EA1y nhanh h\u01A1n.",
        "is_correct": false
      },
      {
        "id": "opt_21_b",
        "text": "\u0110\u1EC3 m\xE1y t\xEDnh kh\xF4ng b\u1ECB nhi\u1EC5m virus.",
        "is_correct": false
      },
      {
        "id": "opt_21_c",
        "text": "\u0110\u1EC3 d\u1EC5 d\xE0ng, nhanh ch\xF3ng t\xECm ki\u1EBFm v\xE0 truy c\u1EADp l\u1EA1i khi c\u1EA7n.",
        "is_correct": true
      },
      {
        "id": "opt_21_d",
        "text": "\u0110\u1EC3 ph\u1EA7n m\u1EC1m \u1EE9ng d\u1EE5ng ho\u1EA1t \u0111\u1ED9ng ch\xEDnh x\xE1c h\u01A1n.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_3_quan_li_du_lieu",
      "tep_va_thu_muc"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_22",
    "type": "single_choice",
    "prompt": "T\u1EC7p ch\u01B0\u01A1ng tr\xECnh m\xE1y t\xEDnh trong h\u1EC7 \u0111i\u1EC1u h\xE0nh Windows th\u01B0\u1EDDng c\xF3 ph\u1EA7n m\u1EDF r\u1ED9ng n\xE0o?",
    "options": [
      {
        "id": "opt_22_a",
        "text": ".mp3, .mp4",
        "is_correct": false
      },
      {
        "id": "opt_22_b",
        "text": ".doc, .docx",
        "is_correct": false
      },
      {
        "id": "opt_22_c",
        "text": ".exe, .com, .bat, .msi",
        "is_correct": true
      },
      {
        "id": "opt_22_d",
        "text": ".jpg, .png",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_3_quan_li_du_lieu",
      "tep_va_thu_muc"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_23",
    "type": "single_choice",
    "prompt": "N\u1EBFu em nh\xECn th\u1EA5y m\u1ED9t t\u1EC7p c\xF3 \u0111u\xF4i '.exe' trong \u1ED5 \u0111\u0129a h\u1EC7 th\u1ED1ng v\xE0 kh\xF4ng bi\u1EBFt r\xF5 v\u1EC1 n\xF3, em N\xCAN l\xE0m g\xEC?",
    "options": [
      {
        "id": "opt_23_a",
        "text": "L\u1EADp t\u1EE9c xo\xE1 n\xF3 \u0111\u1EC3 gi\u1EA3i ph\xF3ng b\u1ED9 nh\u1EDB.",
        "is_correct": false
      },
      {
        "id": "opt_23_b",
        "text": "Kh\xF4ng n\xEAn xo\xE1 hay di chuy\u1EC3n v\xEC \u0111\xF3 c\xF3 th\u1EC3 l\xE0 t\u1EC7p h\u1EC7 th\u1ED1ng/ch\u01B0\u01A1ng tr\xECnh c\u1EA7n thi\u1EBFt.",
        "is_correct": true
      },
      {
        "id": "opt_23_c",
        "text": "\u0110\u1ED5i \u0111u\xF4i t\u1EC7p th\xE0nh '.txt' \u0111\u1EC3 d\u1EC5 \u0111\u1ECDc.",
        "is_correct": false
      },
      {
        "id": "opt_23_d",
        "text": "T\u1EA3i l\xEAn m\u1EA1ng x\xE3 h\u1ED9i chia s\u1EBB cho b\u1EA1n b\xE8.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_3_quan_li_du_lieu",
      "tep_va_thu_muc"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_24",
    "type": "single_choice",
    "prompt": "Sao l\u01B0u d\u1EEF li\u1EC7u l\xE0 thao t\xE1c n\xE0o sau \u0111\xE2y?",
    "options": [
      {
        "id": "opt_24_a",
        "text": "\u0110\u1ED5i t\xEAn to\xE0n b\u1ED9 th\u01B0 m\u1EE5c trong m\xE1y t\xEDnh.",
        "is_correct": false
      },
      {
        "id": "opt_24_b",
        "text": "T\u1EA1o ra b\u1EA3n sao c\xE1c t\u1EC7p/th\u01B0 m\u1EE5c v\xE0 l\u01B0u ch\xFAng l\xEAn m\u1ED9t thi\u1EBFt b\u1ECB l\u01B0u tr\u1EEF kh\xE1c.",
        "is_correct": true
      },
      {
        "id": "opt_24_c",
        "text": "Xo\xE1 d\u1EEF li\u1EC7u g\u1ED1c v\xE0 ch\u1EC9 gi\u1EEF l\u1EA1i m\u1ED9t phi\xEAn b\u1EA3n duy nh\u1EA5t.",
        "is_correct": false
      },
      {
        "id": "opt_24_d",
        "text": "\u0110\u0103ng t\u1EA3i d\u1EEF li\u1EC7u l\xEAn m\u1EA1ng \u0111\u1EC3 m\u1ECDi ng\u01B0\u1EDDi c\xF9ng xem.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_3_quan_li_du_lieu",
      "tep_va_thu_muc"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_25",
    "type": "single_choice",
    "prompt": "Nh\u01B0\u1EE3c \u0111i\u1EC3m c\u1EE7a sao l\u01B0u c\u1EE5c b\u1ED9 (l\u01B0u tr\xEAn \u1ED5 c\u1EE9ng ngo\xE0i, USB \u0111\u1EC3 c\xF9ng ch\u1ED7 v\u1EDBi m\xE1y t\xEDnh) l\xE0 g\xEC?",
    "options": [
      {
        "id": "opt_25_a",
        "text": "Kh\xF4i ph\u1EE5c d\u1EEF li\u1EC7u r\u1EA5t ch\u1EADm.",
        "is_correct": false
      },
      {
        "id": "opt_25_b",
        "text": "Chi ph\xED r\u1EA5t cao.",
        "is_correct": false
      },
      {
        "id": "opt_25_c",
        "text": "N\u1EBFu r\u1EE7i ro l\xE0m m\u1EA5t c\u1EA3 m\xE1y t\xEDnh l\u1EABn USB (v\xED d\u1EE5 h\u1ECFa ho\u1EA1n, m\u1EA5t c\u1EAFp) th\xEC b\u1EA3n sao c\u0169ng b\u1ECB m\u1EA5t theo.",
        "is_correct": true
      },
      {
        "id": "opt_25_d",
        "text": "Kh\xF4ng th\u1EC3 l\u01B0u \u0111\u01B0\u1EE3c c\xE1c t\u1EC7p dung l\u01B0\u1EE3ng l\u1EDBn.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_3_quan_li_du_lieu",
      "tep_va_thu_muc"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_26",
    "type": "single_choice",
    "prompt": "Sao l\u01B0u t\u1EEB xa (nh\u01B0 l\u01B0u tr\u1EEF tr\xEAn c\xF4ng ngh\u1EC7 \u0111\xE1m m\xE2y) c\xF3 \u01B0u \u0111i\u1EC3m g\xEC n\u1ED5i b\u1EADt?",
    "options": [
      {
        "id": "opt_26_a",
        "text": "Kh\xF4ng c\u1EA7n k\u1EBFt n\u1ED1i Internet v\u1EABn sao l\u01B0u \u0111\u01B0\u1EE3c.",
        "is_correct": false
      },
      {
        "id": "opt_26_b",
        "text": "An to\xE0n h\u01A1n khi m\xE1y t\xEDnh g\u1ED1c b\u1ECB h\u1ECFng v\u1EADt l\xED ho\u1EB7c th\u1EA5t l\u1EA1c, c\xF3 th\u1EC3 truy c\u1EADp t\u1EEB m\xE1y t\xEDnh kh\xE1c c\xF3 Internet.",
        "is_correct": true
      },
      {
        "id": "opt_26_c",
        "text": "Kh\xF4ng bao gi\u1EDD s\u1EE3 b\u1ECB tin t\u1EB7c t\u1EA5n c\xF4ng.",
        "is_correct": false
      },
      {
        "id": "opt_26_d",
        "text": "T\u1ED1c \u0111\u1ED9 truy\u1EC1n t\u1EA3i lu\xF4n nhanh h\u01A1n so v\u1EDBi copy ra USB.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_3_quan_li_du_lieu",
      "tep_va_thu_muc"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_27",
    "type": "single_choice",
    "prompt": "M\u1EADt kh\u1EA9u (password) n\xE0o sau \u0111\xE2y \u0111\u01B0\u1EE3c coi l\xE0 m\u1ED9t m\u1EADt kh\u1EA9u M\u1EA0NH?",
    "options": [
      {
        "id": "opt_27_a",
        "text": "12345678",
        "is_correct": false
      },
      {
        "id": "opt_27_b",
        "text": "HaNoi2023",
        "is_correct": false
      },
      {
        "id": "opt_27_c",
        "text": "2n#M1nhKhoa",
        "is_correct": true
      },
      {
        "id": "opt_27_d",
        "text": "nguyenvanA",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_3_quan_li_du_lieu",
      "tep_va_thu_muc"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_28",
    "type": "single_choice",
    "prompt": "Ph\u1EA7n m\u1EC1m n\xE0o sau \u0111\xE2y \u0111\u01B0\u1EE3c s\u1EED d\u1EE5ng \u0111\u1EC3 ph\xE1t hi\u1EC7n v\xE0 ti\xEAu di\u1EC7t ph\u1EA7n m\u1EC1m \u0111\u1ED9c h\u1EA1i (virus)?",
    "options": [
      {
        "id": "opt_28_a",
        "text": "Microsoft PowerPoint.",
        "is_correct": false
      },
      {
        "id": "opt_28_b",
        "text": "Google Chrome.",
        "is_correct": false
      },
      {
        "id": "opt_28_c",
        "text": "Windows Defender, Kaspersky, Bkav.",
        "is_correct": true
      },
      {
        "id": "opt_28_d",
        "text": "File Explorer.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_3_quan_li_du_lieu",
      "tep_va_thu_muc"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_29",
    "type": "single_choice",
    "prompt": "Trong Windows 10, \u1EE9ng d\u1EE5ng n\xE0o gi\xFAp qu\u1EA3n l\xED t\u1EC7p v\xE0 th\u01B0 m\u1EE5c (t\u1EA1o, \u0111\u1ED5i t\xEAn, sao ch\xE9p, di chuy\u1EC3n, xo\xE1...)?",
    "options": [
      {
        "id": "opt_29_a",
        "text": "Microsoft Paint.",
        "is_correct": false
      },
      {
        "id": "opt_29_b",
        "text": "File Explorer.",
        "is_correct": true
      },
      {
        "id": "opt_29_c",
        "text": "Control Panel.",
        "is_correct": false
      },
      {
        "id": "opt_29_d",
        "text": "Task Manager.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_3_quan_li_du_lieu",
      "tep_va_thu_muc"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_30",
    "type": "single_choice",
    "prompt": "\u0110\u1EC3 t\u1EA1o m\u1ED9t th\u01B0 m\u1EE5c m\u1EDBi tr\xEAn m\xE0n h\xECnh n\u1EC1n (Desktop), thao t\xE1c n\xE0o l\xE0 \u0110\xDANG?",
    "options": [
      {
        "id": "opt_30_a",
        "text": "Nh\xE1y \u0111\xFAp chu\u1ED9t tr\xE1i -> ch\u1ECDn New -> Folder.",
        "is_correct": false
      },
      {
        "id": "opt_30_b",
        "text": "Nh\xE1y n\xFAt ph\u1EA3i chu\u1ED9t -> ch\u1ECDn New -> Folder.",
        "is_correct": true
      },
      {
        "id": "opt_30_c",
        "text": "Nh\xE1y chu\u1ED9t tr\xE1i -> ch\u1ECDn View -> Folder.",
        "is_correct": false
      },
      {
        "id": "opt_30_d",
        "text": "K\xE9o th\u1EA3 chu\u1ED9t t\u1EEB g\xF3c n\xE0y sang g\xF3c kia c\u1EE7a m\xE0n h\xECnh.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_3_quan_li_du_lieu",
      "tep_va_thu_muc"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_31",
    "type": "single_choice",
    "prompt": "L\u1EC7nh n\xE0o d\xF9ng \u0111\u1EC3 \u0111\u1ED5i t\xEAn m\u1ED9t th\u01B0 m\u1EE5c ho\u1EB7c t\u1EC7p \u0111\xE3 ch\u1ECDn?",
    "options": [
      {
        "id": "opt_31_a",
        "text": "Copy.",
        "is_correct": false
      },
      {
        "id": "opt_31_b",
        "text": "Paste.",
        "is_correct": false
      },
      {
        "id": "opt_31_c",
        "text": "Delete.",
        "is_correct": false
      },
      {
        "id": "opt_31_d",
        "text": "Rename.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_3_quan_li_du_lieu",
      "tep_va_thu_muc"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_32",
    "type": "single_choice",
    "prompt": "Thao t\xE1c s\u1EED d\u1EE5ng c\u1EB7p l\u1EC7nh 'Copy' v\xE0 'Paste' \u0111\u1ED1i v\u1EDBi m\u1ED9t t\u1EC7p s\u1EBD d\u1EABn \u0111\u1EBFn k\u1EBFt qu\u1EA3 g\xEC?",
    "options": [
      {
        "id": "opt_32_a",
        "text": "T\u1EC7p g\u1ED1c b\u1ECB xo\xE1 \u0111i.",
        "is_correct": false
      },
      {
        "id": "opt_32_b",
        "text": "T\u1EC7p g\u1ED1c b\u1ECB di chuy\u1EC3n sang v\u1ECB tr\xED m\u1EDBi.",
        "is_correct": false
      },
      {
        "id": "opt_32_c",
        "text": "T\u1EA1o ra m\u1ED9t b\u1EA3n sao c\u1EE7a t\u1EC7p t\u1EA1i v\u1ECB tr\xED m\u1EDBi, t\u1EC7p g\u1ED1c v\u1EABn gi\u1EEF nguy\xEAn.",
        "is_correct": true
      },
      {
        "id": "opt_32_d",
        "text": "T\u1EC7p g\u1ED1c b\u1ECB \u0111\u1ED5i t\xEAn.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_3_quan_li_du_lieu",
      "tep_va_thu_muc"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_33",
    "type": "single_choice",
    "prompt": "C\xE1c k\xEAnh trao \u0111\u1ED5i th\xF4ng tin ph\u1ED5 bi\u1EBFn tr\xEAn Internet hi\u1EC7n nay bao g\u1ED3m nh\u1EEFng g\xEC?",
    "options": [
      {
        "id": "opt_33_a",
        "text": "Ch\u1EC9 c\xF3 th\u01B0 \u0111i\u1EC7n t\u1EED (email).",
        "is_correct": false
      },
      {
        "id": "opt_33_b",
        "text": "Th\u01B0 \u0111i\u1EC7n t\u1EED, di\u1EC5n \u0111\xE0n (Forum), m\u1EA1ng x\xE3 h\u1ED9i.",
        "is_correct": true
      },
      {
        "id": "opt_33_c",
        "text": "\u0110i\u1EC7n b\xE1o, b\u01B0u \u0111i\u1EC7n truy\u1EC1n th\u1ED1ng.",
        "is_correct": false
      },
      {
        "id": "opt_33_d",
        "text": "Ch\u1EC9 c\xF3 di\u1EC5n \u0111\xE0n th\u1EA3o lu\u1EADn.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_4_mang_xa_hoi",
      "internet_an_toan"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_34",
    "type": "single_choice",
    "prompt": "M\u1EA1ng x\xE3 h\u1ED9i l\xE0 g\xEC?",
    "options": [
      {
        "id": "opt_34_a",
        "text": "L\xE0 m\u1EA1ng k\u1EBFt n\u1ED1i c\xE1c m\xE1y t\xEDnh trong m\u1ED9t tr\u01B0\u1EDDng h\u1ECDc b\u1EB1ng d\xE2y c\xE1p.",
        "is_correct": false
      },
      {
        "id": "opt_34_b",
        "text": "L\xE0 ph\u1EA7n m\u1EC1m h\u1EC7 th\u1ED1ng gi\xFAp m\xE1y t\xEDnh ho\u1EA1t \u0111\u1ED9ng.",
        "is_correct": false
      },
      {
        "id": "opt_34_c",
        "text": "L\xE0 m\u1ED9t c\u1ED9ng \u0111\u1ED3ng tr\u1EF1c tuy\u1EBFn \u0111\u1EC3 m\u1ECDi ng\u01B0\u1EDDi c\xF3 th\u1EC3 t\u01B0\u01A1ng t\xE1c, giao ti\u1EBFp v\u1EDBi nhau.",
        "is_correct": true
      },
      {
        "id": "opt_34_d",
        "text": "L\xE0 m\u1ED9t th\u01B0 vi\u1EC7n \u0111i\u1EC7n t\u1EED ch\u1EC9 ch\u1EE9a s\xE1ch k\u0129 thu\u1EADt s\u1ED1.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_4_mang_xa_hoi",
      "internet_an_toan"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_35",
    "type": "single_choice",
    "prompt": "M\u1EE5c \u0111\xEDch ch\xEDnh c\u1EE7a m\u1EA1ng x\xE3 h\u1ED9i Facebook ho\u1EB7c Zalo l\xE0 g\xEC?",
    "options": [
      {
        "id": "opt_35_a",
        "text": "Chia s\u1EBB video k\u0129 thu\u1EADt cao l\xE0 ch\u1EE7 y\u1EBFu.",
        "is_correct": false
      },
      {
        "id": "opt_35_b",
        "text": "Th\u1EA3o lu\u1EADn c\xE1c b\xE0i to\xE1n gi\u1EA3i t\xEDch chuy\xEAn s\xE2u.",
        "is_correct": false
      },
      {
        "id": "opt_35_c",
        "text": "Giao l\u01B0u k\u1EBFt n\u1ED1i b\u1EA1n b\xE8, chia s\u1EBB h\xECnh \u1EA3nh, suy ngh\u0129 c\xE1 nh\xE2n.",
        "is_correct": true
      },
      {
        "id": "opt_35_d",
        "text": "Qu\u1EA3n l\xED t\u1EC7p tin trong m\xE1y t\xEDnh n\u1ED9i b\u1ED9.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_4_mang_xa_hoi",
      "internet_an_toan"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_36",
    "type": "single_choice",
    "prompt": "M\u1EA1ng x\xE3 h\u1ED9i YouTube t\u1EADp trung ch\u1EE7 y\u1EBFu v\xE0o vi\u1EC7c chia s\u1EBB lo\u1EA1i d\u1EEF li\u1EC7u n\xE0o?",
    "options": [
      {
        "id": "opt_36_a",
        "text": "V\u0103n b\u1EA3n Word.",
        "is_correct": false
      },
      {
        "id": "opt_36_b",
        "text": "H\xECnh \u1EA3nh (\u1EA2nh ch\u1EE5p t\u0129nh).",
        "is_correct": false
      },
      {
        "id": "opt_36_c",
        "text": "Video.",
        "is_correct": true
      },
      {
        "id": "opt_36_d",
        "text": "T\u1EC7p th\u1EF1c thi ch\u01B0\u01A1ng tr\xECnh.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_4_mang_xa_hoi",
      "internet_an_toan"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_37",
    "type": "single_choice",
    "prompt": "T\xEDnh n\u0103ng n\xE0o sau \u0111\xE2y KH\xD4NG ph\u1EA3i l\xE0 ch\u1EE9c n\u0103ng ph\u1ED5 bi\u1EBFn c\u1EE7a m\u1EA1ng x\xE3 h\u1ED9i?",
    "options": [
      {
        "id": "opt_37_a",
        "text": "G\u1EEDi tin nh\u1EAFn ri\xEAng t\u01B0.",
        "is_correct": false
      },
      {
        "id": "opt_37_b",
        "text": "\u0110\u0103ng \u1EA3nh, video.",
        "is_correct": false
      },
      {
        "id": "opt_37_c",
        "text": "Vi\u1EBFt ch\u01B0\u01A1ng tr\xECnh \u0111i\u1EC1u khi\u1EC3n ph\u1EA7n c\u1EE9ng m\xE1y t\xEDnh.",
        "is_correct": true
      },
      {
        "id": "opt_37_d",
        "text": "B\xECnh lu\u1EADn (comment) tr\xEAn b\xE0i \u0111\u0103ng c\u1EE7a b\u1EA1n b\xE8.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_4_mang_xa_hoi",
      "internet_an_toan"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_38",
    "type": "single_choice",
    "prompt": "\u0110\u1ED9 tu\u1ED5i t\u1ED1i thi\u1EC3u th\u01B0\u1EDDng \u0111\u01B0\u1EE3c quy \u0111\u1ECBnh \u0111\u1EC3 l\u1EADp t\xE0i kho\u1EA3n tr\xEAn nhi\u1EC1u m\u1EA1ng x\xE3 h\u1ED9i ph\u1ED5 bi\u1EBFn (nh\u01B0 Facebook) l\xE0 bao nhi\xEAu?",
    "options": [
      {
        "id": "opt_38_a",
        "text": "6 tu\u1ED5i.",
        "is_correct": false
      },
      {
        "id": "opt_38_b",
        "text": "10 tu\u1ED5i.",
        "is_correct": false
      },
      {
        "id": "opt_38_c",
        "text": "13 tu\u1ED5i.",
        "is_correct": true
      },
      {
        "id": "opt_38_d",
        "text": "18 tu\u1ED5i.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_4_mang_xa_hoi",
      "internet_an_toan"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_39",
    "type": "single_choice",
    "prompt": "Vi\u1EC7c s\u1EED d\u1EE5ng m\u1EA1ng x\xE3 h\u1ED9i \u0111\u1EC3 \u0111\u0103ng th\xF4ng tin \u0111e d\u1ECDa, b\u1EAFt n\u1EA1t ng\u01B0\u1EDDi kh\xE1c l\xE0 h\xE0nh vi:",
    "options": [
      {
        "id": "opt_39_a",
        "text": "\u0110\u01B0\u1EE3c khuy\u1EBFn kh\xEDch \u0111\u1EC3 t\u0103ng t\u01B0\u01A1ng t\xE1c.",
        "is_correct": false
      },
      {
        "id": "opt_39_b",
        "text": "Sai tr\xE1i, vi ph\u1EA1m quy t\u1EAFc s\u1EED d\u1EE5ng v\xE0 c\xF3 th\u1EC3 vi ph\u1EA1m ph\xE1p lu\u1EADt.",
        "is_correct": true
      },
      {
        "id": "opt_39_c",
        "text": "B\xECnh th\u01B0\u1EDDng, th\u1EC3 hi\u1EC7n c\xE1 t\xEDnh ri\xEAng.",
        "is_correct": false
      },
      {
        "id": "opt_39_d",
        "text": "Ch\u1EC9 mang t\xEDnh ch\u1EA5t gi\u1EA3i tr\xED, kh\xF4ng c\xF3 h\u1EADu qu\u1EA3.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_4_mang_xa_hoi",
      "internet_an_toan"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_40",
    "type": "single_choice",
    "prompt": "N\u1EBFu em b\u1EAFt g\u1EB7p m\u1ED9t th\xF4ng tin 's\u1ED1c' tr\xEAn m\u1EA1ng nh\u01B0ng ch\u01B0a \u0111\u01B0\u1EE3c ki\u1EC3m ch\u1EE9ng, vi\u1EC7c l\xE0m \u0110\xDANG \u0111\u1EAFn l\xE0 g\xEC?",
    "options": [
      {
        "id": "opt_40_a",
        "text": "L\u1EADp t\u1EE9c chia s\u1EBB ngay \u0111\u1EC3 c\u1EA3nh b\xE1o m\u1ECDi ng\u01B0\u1EDDi.",
        "is_correct": false
      },
      {
        "id": "opt_40_b",
        "text": "Th\xEAm b\xECnh lu\u1EADn k\xEDch \u0111\u1ED9ng v\xE0o b\xE0i vi\u1EBFt.",
        "is_correct": false
      },
      {
        "id": "opt_40_c",
        "text": "Kh\xF4ng chia s\u1EBB v\u1ED9i, t\xECm hi\u1EC3u k\u0129 t\xEDnh x\xE1c th\u1EF1c c\u1EE7a th\xF4ng tin t\u1EEB c\xE1c ngu\u1ED3n ch\xEDnh th\u1ED1ng.",
        "is_correct": true
      },
      {
        "id": "opt_40_d",
        "text": "Sao ch\xE9p v\xE0 \u0111\u0103ng l\u1EA1i tr\xEAn trang c\xE1 nh\xE2n c\u1EE7a m\xECnh xem nh\u01B0 l\xE0 th\xF4ng tin c\u1EE7a m\xECnh.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_4_mang_xa_hoi",
      "internet_an_toan"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_41",
    "type": "single_choice",
    "prompt": "Khi s\u1EED d\u1EE5ng m\u1EA1ng x\xE3 h\u1ED9i, \u0111\u1EC3 \u0111\u1EA3m b\u1EA3o an to\xE0n th\xF4ng tin c\xE1 nh\xE2n, em N\xCAN l\xE0m g\xEC?",
    "options": [
      {
        "id": "opt_41_a",
        "text": "C\xF4ng khai m\u1EADt kh\u1EA9u \u0111\u1EC3 b\u1EA1n b\xE8 c\xF9ng s\u1EED d\u1EE5ng chung.",
        "is_correct": false
      },
      {
        "id": "opt_41_b",
        "text": "\u0110\u1EC3 ch\u1EBF \u0111\u1ED9 c\xF4ng khai (Public) to\xE0n b\u1ED9 th\xF4ng tin ng\xE0y th\xE1ng n\u0103m sinh, s\u1ED1 \u0111i\u1EC7n tho\u1EA1i, \u0111\u1ECBa ch\u1EC9 nh\xE0.",
        "is_correct": false
      },
      {
        "id": "opt_41_c",
        "text": "Ch\u1EC9 k\u1EBFt b\u1EA1n v\xE0 tr\xF2 chuy\u1EC7n v\u1EDBi ng\u01B0\u1EDDi m\xE0 em th\u1EF1c s\u1EF1 quen bi\u1EBFt v\xE0 tin t\u01B0\u1EDFng.",
        "is_correct": true
      },
      {
        "id": "opt_41_d",
        "text": "\u0110\u0103ng t\u1EA3i m\u1ECDi ho\u1EA1t \u0111\u1ED9ng, l\u1ECBch tr\xECnh di chuy\u1EC3n chi ti\u1EBFt h\xE0ng ng\xE0y c\u1EE7a b\u1EA3n th\xE2n l\xEAn m\u1EA1ng.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_4_mang_xa_hoi",
      "internet_an_toan"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_42",
    "type": "single_choice",
    "prompt": "B\u1EA1n B ch\u1EE5p \u1EA3nh \u0111\u1EC1 thi chia s\u1EBB l\xEAn m\u1EA1ng x\xE3 h\u1ED9i nh\u1EDD gi\u1EA3i h\u1ED9 trong gi\u1EDD ki\u1EC3m tra. H\xE0nh vi n\xE0y:",
    "options": [
      {
        "id": "opt_42_a",
        "text": "L\xE0 h\xE0nh vi vi ph\u1EA1m nghi\xEAm tr\u1ECDng quy ch\u1EBF thi v\xE0 ph\xE1p lu\u1EADt.",
        "is_correct": true
      },
      {
        "id": "opt_42_b",
        "text": "L\xE0 c\xE1ch trao \u0111\u1ED5i th\xF4ng tin nhanh ch\xF3ng, s\xE1ng t\u1EA1o.",
        "is_correct": false
      },
      {
        "id": "opt_42_c",
        "text": "\u0110\u01B0\u1EE3c khuy\u1EBFn kh\xEDch v\xEC gi\xFAp h\u1ECDc sinh h\u1ECDc h\u1ECFi l\u1EABn nhau.",
        "is_correct": false
      },
      {
        "id": "opt_42_d",
        "text": "Ch\u1EC9 b\u1ECB nh\u1EAFc nh\u1EDF nh\u1EB9 nh\xE0ng v\xEC \u0111\xF3 l\xE0 quy\u1EC1n c\xE1 nh\xE2n.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_4_mang_xa_hoi",
      "internet_an_toan"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_43",
    "type": "single_choice",
    "prompt": "\u0110\u1EC3 chia s\u1EBB m\u1ED9t b\u1EE9c \u1EA3nh l\xEAn trang Facebook c\xE1 nh\xE2n, em s\u1EBD s\u1EED d\u1EE5ng ch\u1EE9c n\u0103ng n\xE0o trong m\u1EE5c t\u1EA1o b\xE0i vi\u1EBFt?",
    "options": [
      {
        "id": "opt_43_a",
        "text": "T\xECm ki\u1EBFm b\u1EA1n b\xE8.",
        "is_correct": false
      },
      {
        "id": "opt_43_b",
        "text": "\u1EA2nh/Video.",
        "is_correct": true
      },
      {
        "id": "opt_43_c",
        "text": "Video tr\u1EF1c ti\u1EBFp.",
        "is_correct": false
      },
      {
        "id": "opt_43_d",
        "text": "T\u1EA1o nh\xF3m m\u1EDBi.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_4_mang_xa_hoi",
      "internet_an_toan"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_44",
    "type": "single_choice",
    "prompt": "Thao t\xE1c n\xE0o d\xF9ng \u0111\u1EC3 di chuy\u1EC3n m\u1ED9t th\u01B0 m\u1EE5c/t\u1EC7p (c\u1EAFt t\u1EEB ch\u1ED7 c\u0169 sang ch\u1ED7 m\u1EDBi)?",
    "options": [
      {
        "id": "opt_44_a",
        "text": "Copy v\xE0 Paste.",
        "is_correct": false
      },
      {
        "id": "opt_44_b",
        "text": "Cut v\xE0 Paste.",
        "is_correct": true
      },
      {
        "id": "opt_44_c",
        "text": "Delete v\xE0 Paste.",
        "is_correct": false
      },
      {
        "id": "opt_44_d",
        "text": "Rename v\xE0 Cut.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_4_mang_xa_hoi",
      "internet_an_toan"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_45",
    "type": "true_false",
    "prompt": "\u0110\u1ECDc c\xE1c ph\xE1t bi\u1EC3u sau v\u1EC1 'Thi\u1EBFt b\u1ECB v\xE0o - ra':",
    "items": [
      {
        "id": "sub_45_a",
        "text": "Thi\u1EBFt b\u1ECB v\xE0o gi\xFAp con ng\u01B0\u1EDDi nh\u1EADp th\xF4ng tin v\xE0o m\xE1y t\xEDnh, v\xED d\u1EE5 nh\u01B0 b\xE0n ph\xEDm, micro.",
        "is_correct": true
      },
      {
        "id": "sub_45_b",
        "text": "M\xE1y in v\xE0 loa l\xE0 c\xE1c thi\u1EBFt b\u1ECB v\xE0o, gi\xFAp m\xE1y t\xEDnh thu nh\u1EADn h\xECnh \u1EA3nh v\xE0 \xE2m thanh t\u1EEB m\xF4i tr\u01B0\u1EDDng.",
        "is_correct": false
      },
      {
        "id": "sub_45_c",
        "text": "M\xE0n h\xECnh c\u1EA3m \u1EE9ng v\u1EEBa \u0111\xF3ng vai tr\xF2 thi\u1EBFt b\u1ECB ra (hi\u1EC3n th\u1ECB), v\u1EEBa \u0111\xF3ng vai tr\xF2 thi\u1EBFt b\u1ECB v\xE0o (nh\u1EADn thao t\xE1c ch\u1EA1m).",
        "is_correct": true
      },
      {
        "id": "sub_45_d",
        "text": "Loa th\xF4ng minh ch\u1EC9 c\xF3 ch\u1EE9c n\u0103ng ph\xE1t \xE2m thanh, kh\xF4ng th\u1EC3 k\u1EBFt n\u1ED1i Internet hay nh\u1EADn l\u1EC7nh b\u1EB1ng gi\u1ECDng n\xF3i.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "dung_sai_chum",
      "on_tap_giua_ki_1"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_46",
    "type": "true_false",
    "prompt": "\u0110\u1ECDc c\xE1c ph\xE1t bi\u1EC3u sau v\u1EC1 'S\u1EED d\u1EE5ng m\xE1y t\xEDnh an to\xE0n':",
    "items": [
      {
        "id": "sub_46_a",
        "text": "C\u1EA7n c\u1EA5p ngu\u1ED3n \u0111i\u1EC7n cho m\xE1y t\xEDnh ngay l\u1EADp t\u1EE9c tr\u01B0\u1EDBc khi c\u1EAFm d\xE2y c\xE1p m\xE0n h\xECnh hay b\xE0n ph\xEDm.",
        "is_correct": false
      },
      {
        "id": "sub_46_b",
        "text": "C\u1EAFm nh\u1EA7m c\u1ED5ng k\u1EBFt n\u1ED1i (v\xED d\u1EE5 \u0111\u1EA7u c\u1EAFm kh\xF4ng ph\u1EA3i USB c\u1ED1 c\u1EAFm v\xE0o c\u1ED5ng USB) c\xF3 th\u1EC3 g\xE2y ch\u1EADp \u0111i\u1EC7n h\u1ECFng thi\u1EBFt b\u1ECB.",
        "is_correct": true
      },
      {
        "id": "sub_46_c",
        "text": "N\xEAn t\u1EAFt m\xE1y t\xEDnh b\u1EB1ng l\u1EC7nh Shut down c\u1EE7a h\u1EC7 \u0111i\u1EC1u h\xE0nh thay v\xEC ng\u1EAFt ngu\u1ED3n \u0111i\u1EC7n tr\u1EF1c ti\u1EBFp.",
        "is_correct": true
      },
      {
        "id": "sub_46_d",
        "text": "Kh\xF4ng n\xEAn r\xFAt d\xE2y \u0111i\u1EC7n khi lau d\u1ECDn m\xE1y t\xEDnh v\xEC c\u1EA7n b\u1EADt m\xE1y \u0111\u1EC3 xem lau \u0111\xE3 s\u1EA1ch ch\u01B0a.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "dung_sai_chum",
      "on_tap_giua_ki_1"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_47",
    "type": "true_false",
    "prompt": "\u0110\u1ECDc c\xE1c ph\xE1t bi\u1EC3u sau v\u1EC1 'H\u1EC7 \u0111i\u1EC1u h\xE0nh v\xE0 Ph\u1EA7n m\u1EC1m \u1EE9ng d\u1EE5ng':",
    "items": [
      {
        "id": "sub_47_a",
        "text": "H\u1EC7 \u0111i\u1EC1u h\xE0nh ph\u1EA3i \u0111\u01B0\u1EE3c c\xE0i \u0111\u1EB7t \u0111\u1EA7u ti\xEAn \u0111\u1EC3 m\xE1y t\xEDnh c\xF3 th\u1EC3 ho\u1EA1t \u0111\u1ED9ng.",
        "is_correct": true
      },
      {
        "id": "sub_47_b",
        "text": "Microsoft Word v\xE0 Excel l\xE0 c\xE1c h\u1EC7 \u0111i\u1EC1u h\xE0nh ph\u1ED5 bi\u1EBFn nh\u1EA5t hi\u1EC7n nay.",
        "is_correct": false
      },
      {
        "id": "sub_47_c",
        "text": "\u0110i\u1EC7n tho\u1EA1i th\xF4ng minh (smartphone) kh\xF4ng c\u1EA7n h\u1EC7 \u0111i\u1EC1u h\xE0nh, n\xF3 ch\u1EC9 c\u1EA7n ph\u1EA7n m\u1EC1m \u1EE9ng d\u1EE5ng \u0111\u1EC3 ch\u1EA1y.",
        "is_correct": false
      },
      {
        "id": "sub_47_d",
        "text": "Ph\u1EA7n m\u1EDF r\u1ED9ng c\u1EE7a t\u1EC7p (v\xED d\u1EE5 .docx, .mp3) gi\xFAp h\u1EC7 \u0111i\u1EC1u h\xE0nh nh\u1EADn di\u1EC7n lo\u1EA1i t\u1EC7p v\xE0 ch\u1ECDn ph\u1EA7n m\u1EC1m m\u1EDF t\u01B0\u01A1ng \u1EE9ng.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_7",
      "dung_sai_chum",
      "on_tap_giua_ki_1"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_48",
    "type": "true_false",
    "prompt": "\u0110\u1ECDc c\xE1c ph\xE1t bi\u1EC3u sau v\u1EC1 'Qu\u1EA3n l\xED v\xE0 b\u1EA3o v\u1EC7 d\u1EEF li\u1EC7u':",
    "items": [
      {
        "id": "sub_48_a",
        "text": "Khi \u0111\u1EB7t t\xEAn t\u1EC7p v\xE0 th\u01B0 m\u1EE5c, n\xEAn \u0111\u1EB7t t\xEAn tu\u1EF3 \xFD, kh\xF4ng li\xEAn quan \u0111\u1EBFn n\u1ED9i dung \u0111\u1EC3 b\u1EA3o m\u1EADt th\xF4ng tin.",
        "is_correct": false
      },
      {
        "id": "sub_48_b",
        "text": "C\xE1c t\u1EC7p c\xF3 ph\u1EA7n m\u1EDF r\u1ED9ng .exe, .com th\u01B0\u1EDDng l\xE0 t\u1EC7p ch\u01B0\u01A1ng tr\xECnh, kh\xF4ng n\xEAn t\u1EF1 \xFD xo\xE1 hay di chuy\u1EC3n.",
        "is_correct": true
      },
      {
        "id": "sub_48_c",
        "text": "Sao l\u01B0u d\u1EEF li\u1EC7u l\xEAn c\xF4ng ngh\u1EC7 \u0111\xE1m m\xE2y (Internet) gi\xFAp d\u1EEF li\u1EC7u an to\xE0n ngay c\u1EA3 khi m\xE1y t\xEDnh v\u1EADt l\xED b\u1ECB h\u1ECFng.",
        "is_correct": true
      },
      {
        "id": "sub_48_d",
        "text": "M\u1ED9t m\u1EADt kh\u1EA9u m\u1EA1nh ch\u1EC9 c\u1EA7n ch\u1EE9a duy nh\u1EA5t c\xE1c con s\u1ED1 li\xEAn ti\u1EBFp (nh\u01B0 12345678) cho d\u1EC5 nh\u1EDB.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "dung_sai_chum",
      "on_tap_giua_ki_1"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_49",
    "type": "true_false",
    "prompt": "\u0110\u1ECDc c\xE1c ph\xE1t bi\u1EC3u sau v\u1EC1 'M\u1EA1ng x\xE3 h\u1ED9i':",
    "items": [
      {
        "id": "sub_49_a",
        "text": "M\u1EA1ng x\xE3 h\u1ED9i l\xE0 m\u1ED9t c\u1ED9ng \u0111\u1ED3ng tr\u1EF1c tuy\u1EBFn n\u01A1i m\u1ECDi ng\u01B0\u1EDDi c\xF3 th\u1EC3 t\u01B0\u01A1ng t\xE1c, chia s\u1EBB th\xF4ng tin v\u1EDBi nhau.",
        "is_correct": true
      },
      {
        "id": "sub_49_b",
        "text": "M\u1ECDi website tr\xEAn Internet (k\u1EC3 c\u1EA3 trang \u0111\u1ECDc b\xE1o \u0111i\u1EC7n t\u1EED 1 chi\u1EC1u) \u0111\u1EC1u \u0111\u01B0\u1EE3c g\u1ECDi l\xE0 m\u1EA1ng x\xE3 h\u1ED9i.",
        "is_correct": false
      },
      {
        "id": "sub_49_c",
        "text": "Khi tham gia m\u1EA1ng x\xE3 h\u1ED9i, ng\u01B0\u1EDDi d\xF9ng c\xF3 th\u1EC3 g\u1EEDi tin nh\u1EAFn, b\xECnh lu\u1EADn ho\u1EB7c chia s\u1EBB \u1EA3nh, video.",
        "is_correct": true
      },
      {
        "id": "sub_49_d",
        "text": "V\xEC m\u1EA1ng x\xE3 h\u1ED9i l\xE0 th\u1EBF gi\u1EDBi \u1EA3o, m\u1ECDi ng\u01B0\u1EDDi c\xF3 th\u1EC3 t\u1EF1 do ph\xE1t ng\xF4n, l\u0103ng m\u1EA1 ng\u01B0\u1EDDi kh\xE1c m\xE0 kh\xF4ng ph\u1EA3i ch\u1ECBu tr\xE1ch nhi\u1EC7m.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "dung_sai_chum",
      "on_tap_giua_ki_1"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_50",
    "type": "true_false",
    "prompt": "\u0110\u1ECDc c\xE1c ph\xE1t bi\u1EC3u sau v\u1EC1 'Quy t\u1EAFc an to\xE0n tr\xEAn m\u1EA1ng Internet':",
    "items": [
      {
        "id": "sub_50_a",
        "text": "Vi\u1EC7c \u0111\u0103ng t\u1EA3i c\xE1c th\xF4ng tin gi\u1EA3 m\u1EA1o, sai s\u1EF1 th\u1EADt tr\xEAn m\u1EA1ng x\xE3 h\u1ED9i l\xE0 h\xE0nh vi b\u1ECB c\u1EA5m v\xE0 c\xF3 th\u1EC3 b\u1ECB ph\u1EA1t.",
        "is_correct": true
      },
      {
        "id": "sub_50_b",
        "text": "B\u1EA5t k\xEC ai, \u1EDF m\u1ECDi l\u1EE9a tu\u1ED5i, k\u1EC3 c\u1EA3 d\u01B0\u1EDBi 10 tu\u1ED5i \u0111\u1EC1u \u0111\u01B0\u1EE3c ph\xE9p t\u1EF1 do l\u1EADp t\xE0i kho\u1EA3n Facebook m\xE0 kh\xF4ng c\xF3 gi\u1EDBi h\u1EA1n n\xE0o.",
        "is_correct": false
      },
      {
        "id": "sub_50_c",
        "text": "Khi nh\u1EADn \u0111\u01B0\u1EE3c m\u1ED9t y\xEAu c\u1EA7u k\u1EBFt b\u1EA1n t\u1EEB m\u1ED9t t\xE0i kho\u1EA3n ho\xE0n to\xE0n xa l\u1EA1, em n\xEAn ch\u1EA5p nh\u1EADn ngay \u0111\u1EC3 c\xF3 th\xEAm nhi\u1EC1u b\u1EA1n.",
        "is_correct": false
      },
      {
        "id": "sub_50_d",
        "text": "M\u1EA1ng x\xE3 h\u1ED9i c\xF3 t\xEDnh hai m\u1EB7t (t\u1ED1t v\xE0 x\u1EA5u), ch\xFAng ta c\u1EA7n t\xECm hi\u1EC3u k\u0129 v\xE0 s\u1EED d\u1EE5ng \u0111\xFAng m\u1EE5c \u0111\xEDch.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_7",
      "dung_sai_chum",
      "on_tap_giua_ki_1"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin10_gk1_1",
    "type": "single_choice",
    "grade": "L\u1EDBp 10",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I",
    "prompt": "H\u1EC7 \u0111\u1EBFm nh\u1ECB ph\xE2n (Binary system) s\u1EED d\u1EE5ng c\xE1c k\xED s\u1ED1 n\xE0o sau \u0111\xE2y \u0111\u1EC3 bi\u1EC3u di\u1EC5n d\u1EEF li\u1EC7u trong m\xE1y t\xEDnh?",
    "options": [
      {
        "id": "opt_t10_1_a",
        "text": "Ch\u1EC9 g\u1ED3m hai k\xED s\u1ED1 0 v\xE0 1",
        "is_correct": true
      },
      {
        "id": "opt_t10_1_b",
        "text": "C\xE1c k\xED s\u1ED1 t\u1EEB 0 \u0111\u1EBFn 9",
        "is_correct": false
      },
      {
        "id": "opt_t10_1_c",
        "text": "C\xE1c k\xED s\u1ED1 t\u1EEB 0 \u0111\u1EBFn 7",
        "is_correct": false
      },
      {
        "id": "opt_t10_1_d",
        "text": "G\u1ED3m 0, 1 v\xE0 c\xE1c ch\u1EEF c\xE1i A \u0111\u1EBFn F",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_10",
      "bieu_dien_thong_tin",
      "nhi_phan"
    ]
  },
  {
    "id": "q_tin10_ck1_2",
    "type": "single_choice",
    "grade": "L\u1EDBp 10",
    "subject": "Tin h\u1ECDc",
    "term": "Cu\u1ED1i k\xEC I",
    "prompt": "Trong ng\xF4n ng\u1EEF l\u1EADp tr\xECnh Python, h\xE0m n\xE0o sau \u0111\xE2y \u0111\u01B0\u1EE3c s\u1EED d\u1EE5ng \u0111\u1EC3 xu\u1EA5t d\u1EEF li\u1EC7u ra m\xE0n h\xECnh?",
    "options": [
      {
        "id": "opt_t10_2_a",
        "text": "print()",
        "is_correct": true
      },
      {
        "id": "opt_t10_2_b",
        "text": "input()",
        "is_correct": false
      },
      {
        "id": "opt_t10_2_c",
        "text": "echo()",
        "is_correct": false
      },
      {
        "id": "opt_t10_2_d",
        "text": "output()",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_10",
      "lap_trinh_python",
      "cuoi_ki_1"
    ]
  },
  {
    "id": "q_tin8_gk1_3",
    "type": "single_choice",
    "grade": "L\u1EDBp 8",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I",
    "prompt": "Th\xF4ng tin trong m\xF4i tr\u01B0\u1EDDng s\u1ED1 c\xF3 \u0111\u1EB7c \u0111i\u1EC3m n\u1ED5i b\u1EADt n\xE0o sau \u0111\xE2y?",
    "options": [
      {
        "id": "opt_t8_3_a",
        "text": "D\u1EC5 d\xE0ng sao ch\xE9p, lan truy\u1EC1n nhanh ch\xF3ng v\xE0 kh\xF3 thu h\u1ED3i tri\u1EC7t \u0111\u1EC3",
        "is_correct": true
      },
      {
        "id": "opt_t8_3_b",
        "text": "Ho\xE0n to\xE0n b\u1EA3o m\u1EADt v\xE0 kh\xF4ng bao gi\u1EDD b\u1ECB r\xF2 r\u1EC9",
        "is_correct": false
      },
      {
        "id": "opt_t8_3_c",
        "text": "Ch\u1EC9 l\u01B0u tr\u1EEF \u0111\u01B0\u1EE3c tr\xEAn gi\u1EA5y v\xE0 s\xE1ch v\u1EDF in truy\u1EC1n th\u1ED1ng",
        "is_correct": false
      },
      {
        "id": "opt_t8_3_d",
        "text": "Kh\xF4ng th\u1EC3 chia s\u1EBB qua m\u1EA1ng Internet",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_8",
      "thong_tin_so",
      "giua_ki_1"
    ]
  },
  {
    "id": "q_tin9_gk1_4",
    "type": "true_false",
    "grade": "L\u1EDBp 9",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I",
    "prompt": "X\xE9t t\xEDnh \u0110\xFAng / Sai c\u1EE7a c\xE1c kh\u1EB3ng \u0111\u1ECBnh sau v\u1EC1 m\u1EA1ng m\xE1y t\xEDnh v\xE0 an to\xE0n th\xF4ng tin:",
    "items": [
      {
        "id": "sub_t9_4_a",
        "text": "M\u1EA1ng LAN l\xE0 m\u1EA1ng k\u1EBFt n\u1ED1i c\xE1c m\xE1y t\xEDnh trong ph\u1EA1m vi h\u1EB9p nh\u01B0 tr\u01B0\u1EDDng h\u1ECDc, v\u0103n ph\xF2ng.",
        "is_correct": true
      },
      {
        "id": "sub_t9_4_b",
        "text": "\u0110\u1ECBa ch\u1EC9 IP l\xE0 \u0111\u1ECBnh danh duy nh\u1EA5t c\u1EE7a m\u1ED7i thi\u1EBFt b\u1ECB khi tham gia v\xE0o m\u1EA1ng Internet.",
        "is_correct": true
      },
      {
        "id": "sub_t9_4_c",
        "text": "C\xE1p m\u1EA1ng xo\u1EAFn \u0111\xF4i (UTP) l\xE0 ph\u01B0\u01A1ng ti\u1EC7n truy\u1EC1n d\u1EABn kh\xF4ng d\xE2y.",
        "is_correct": false
      },
      {
        "id": "sub_t9_4_d",
        "text": "Trang web c\xF3 giao th\u1EE9c https:// gi\xFAp m\xE3 h\xF3a b\u1EA3o m\u1EADt th\xF4ng tin t\u1ED1t h\u01A1n http://.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_9",
      "mang_may_tinh",
      "dung_sai"
    ]
  },
  {
    "id": "q_tin7_ck1_5",
    "type": "single_choice",
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn",
    "prompt": "Trong ph\u1EA7n m\u1EC1m b\u1EA3ng t\xEDnh \u0111i\u1EC7n t\u1EED (MS Excel), c\xFA ph\xE1p h\xE0m n\xE0o sau \u0111\xE2y d\xF9ng \u0111\u1EC3 t\xEDnh t\u1ED5ng c\xE1c \xF4 t\u1EEB A1 \u0111\u1EBFn A5?",
    "options": [
      {
        "id": "opt_t7_ck1_a",
        "text": "=SUM(A1:A5)",
        "is_correct": true
      },
      {
        "id": "opt_t7_ck1_b",
        "text": "=AVERAGE(A1:A5)",
        "is_correct": false
      },
      {
        "id": "opt_t7_ck1_c",
        "text": "=TOTAL(A1..A5)",
        "is_correct": false
      },
      {
        "id": "opt_t7_ck1_d",
        "text": "=COUNT(A1:A5)",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bang_tinh_excel",
      "cuoi_ki_1"
    ]
  },
  {
    "id": "q_tin6_ot_1",
    "type": "single_choice",
    "prompt": "Th\xF4ng tin l\xE0 g\xEC?",
    "options": [
      {
        "id": "opt_t6_ot_1_a",
        "text": "Nh\u1EEFng g\xEC \u0111em l\u1EA1i hi\u1EC3u bi\u1EBFt cho con ng\u01B0\u1EDDi v\u1EC1 th\u1EBF gi\u1EDBi xung quanh v\xE0 v\u1EC1 ch\xEDnh b\u1EA3n th\xE2n m\xECnh.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_1_b",
        "text": "C\xE1c con s\u1ED1, ch\u1EEF vi\u1EBFt v\xE0 h\xECnh \u1EA3nh tr\xEAn trang gi\u1EA5y.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_1_c",
        "text": "B\u1EA5t k\xEC v\u1EADt th\u1EC3 n\xE0o xung quanh ch\xFAng ta.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_1_d",
        "text": "C\xE1c thi\u1EBFt b\u1ECB \u0111i\u1EC7n t\u1EED c\xF3 kh\u1EA3 n\u0103ng l\u01B0u tr\u1EEF.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_1_thong_tin_va_du_lieu"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_2",
    "type": "single_choice",
    "prompt": "D\u1EEF li\u1EC7u l\xE0 g\xEC?",
    "options": [
      {
        "id": "opt_t6_ot_2_a",
        "text": "S\u1EF1 hi\u1EC3u bi\u1EBFt c\u1EE7a con ng\u01B0\u1EDDi.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_2_b",
        "text": "Th\xF4ng tin \u0111\u01B0\u1EE3c ghi l\xEAn v\u1EADt mang tin.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_2_c",
        "text": "Qu\xE1 tr\xECnh thu nh\u1EADn v\xE0 x\u1EED l\xED th\xF4ng tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_2_d",
        "text": "C\xE1c thi\u1EBFt b\u1ECB d\xF9ng \u0111\u1EC3 k\u1EBFt n\u1ED1i m\u1EA1ng.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_1_thong_tin_va_du_lieu"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_3",
    "type": "single_choice",
    "prompt": "V\u1EADt mang tin l\xE0 g\xEC?",
    "options": [
      {
        "id": "opt_t6_ot_3_a",
        "text": "Nh\u1EEFng g\xEC \u0111em l\u1EA1i hi\u1EC3u bi\u1EBFt cho con ng\u01B0\u1EDDi.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_3_b",
        "text": "C\xE1c thi\u1EBFt b\u1ECB \u0111\u1EA7u cu\u1ED1i trong m\u1EA1ng m\xE1y t\xEDnh.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_3_c",
        "text": "Ph\u01B0\u01A1ng ti\u1EC7n \u0111\u01B0\u1EE3c d\xF9ng \u0111\u1EC3 l\u01B0u tr\u1EEF v\xE0 truy\u1EC1n t\u1EA3i th\xF4ng tin.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_3_d",
        "text": "C\xE1c ph\u1EA7n m\u1EC1m gi\xFAp m\xE1y t\xEDnh ho\u1EA1t \u0111\u1ED9ng.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_1_thong_tin_va_du_lieu"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_4",
    "type": "single_choice",
    "prompt": "D\u1EEF li\u1EC7u \u0111\u01B0\u1EE3c th\u1EC3 hi\u1EC7n d\u01B0\u1EDBi nh\u1EEFng d\u1EA1ng c\u01A1 b\u1EA3n n\xE0o?",
    "options": [
      {
        "id": "opt_t6_ot_4_a",
        "text": "Ch\u1EC9 v\u0103n b\u1EA3n v\xE0 con s\u1ED1.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_4_b",
        "text": "Ch\u1EC9 h\xECnh \u1EA3nh v\xE0 \xE2m thanh.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_4_c",
        "text": "\xC2m thanh, h\xECnh \u1EA3nh, v\u0103n b\u1EA3n v\xE0 c\xE1c con s\u1ED1.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_4_d",
        "text": "C\xE1c thi\u1EBFt b\u1ECB ph\u1EA7n c\u1EE9ng c\u1EE7a m\xE1y t\xEDnh.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_1_thong_tin_va_du_lieu"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_5",
    "type": "single_choice",
    "prompt": "Nh\u1EADn \u0111\u1ECBnh n\xE0o sau \u0111\xE2y \u0111\xFAng v\u1EC1 m\u1ED1i quan h\u1EC7 gi\u1EEFa th\xF4ng tin v\xE0 d\u1EEF li\u1EC7u?",
    "options": [
      {
        "id": "opt_t6_ot_5_a",
        "text": "Th\xF4ng tin v\xE0 d\u1EEF li\u1EC7u l\xE0 m\u1ED9t, kh\xF4ng c\xF3 s\u1EF1 kh\xE1c bi\u1EC7t.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_5_b",
        "text": "Th\xF4ng tin \u0111\u01B0\u1EE3c ghi l\xEAn v\u1EADt mang tin tr\u1EDF th\xE0nh d\u1EEF li\u1EC7u.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_5_c",
        "text": "Th\xF4ng tin lu\xF4n n\u1EB1m trong m\xE1y t\xEDnh, c\xF2n d\u1EEF li\u1EC7u \u1EDF ngo\xE0i \u0111\u1EDDi th\u1EF1c.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_5_d",
        "text": "D\u1EEF li\u1EC7u ch\u1EC9 c\xF3 \xFD ngh\u0129a \u0111\u1ED1i v\u1EDBi m\xE1y t\xEDnh, kh\xF4ng c\xF3 \xFD ngh\u0129a \u0111\u1ED1i v\u1EDBi con ng\u01B0\u1EDDi.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_1_thong_tin_va_du_lieu"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_6",
    "type": "single_choice",
    "prompt": "S\u1EF1 hi\u1EC3u bi\u1EBFt m\xE0 th\xF4ng tin \u0111em l\u1EA1i lu\xF4n ph\u1EE5 thu\u1ED9c v\xE0o y\u1EBFu t\u1ED1 n\xE0o?",
    "options": [
      {
        "id": "opt_t6_ot_6_a",
        "text": "T\u1ED1c \u0111\u1ED9 c\u1EE7a m\xE1y t\xEDnh.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_6_b",
        "text": "\u0110\u1ED9 l\u1EDBn c\u1EE7a v\u1EADt mang tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_6_c",
        "text": "Ng\u01B0\u1EDDi ti\u1EBFp nh\u1EADn th\xF4ng tin \u0111\xF3.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_6_d",
        "text": "D\xE3y bit bi\u1EC3u di\u1EC5n th\xF4ng tin.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_1_thong_tin_va_du_lieu"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_7",
    "type": "single_choice",
    "prompt": "Khi \u0111i tr\xEAn \u0111\u01B0\u1EDDng, b\u1EA1n Minh th\u1EA5y \u0111\xE8n giao th\xF4ng chuy\u1EC3n sang m\xE0u \u0111\u1ECF n\xEAn d\u1EEBng l\u1EA1i. Trong tr\u01B0\u1EDDng h\u1EE3p n\xE0y, '\u0111\xE8n giao th\xF4ng chuy\u1EC3n m\xE0u \u0111\u1ECF' \u0111\xF3ng vai tr\xF2 l\xE0 g\xEC?",
    "options": [
      {
        "id": "opt_t6_ot_7_a",
        "text": "Th\xF4ng tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_7_b",
        "text": "D\u1EEF li\u1EC7u.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_7_c",
        "text": "Qu\xE1 tr\xECnh x\u1EED l\xED.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_7_d",
        "text": "B\u1ED9 nh\u1EDB.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_1_thong_tin_va_du_lieu"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_8",
    "type": "single_choice",
    "prompt": "T\u1EEB vi\u1EC7c th\u1EA5y \u0111\xE8n \u0111\u1ECF, b\u1EA1n Minh bi\u1EBFt r\u1EB1ng m\xECnh 'ph\u1EA3i d\u1EEBng xe l\u1EA1i \u0111\u1EC3 \u0111\u1EA3m b\u1EA3o an to\xE0n'. \u0110i\u1EC1u m\xE0 Minh bi\u1EBFt \u0111\u01B0\u1EE3c g\u1ECDi l\xE0 g\xEC?",
    "options": [
      {
        "id": "opt_t6_ot_8_a",
        "text": "Th\xF4ng tin.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_8_b",
        "text": "D\u1EEF li\u1EC7u.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_8_c",
        "text": "V\u1EADt mang tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_8_d",
        "text": "Thi\u1EBFt b\u1ECB v\xE0o.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_1_thong_tin_va_du_lieu"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_9",
    "type": "single_choice",
    "prompt": "Trong t\xECnh hu\u1ED1ng b\u1EA1n An xem m\u1EE5c d\u1EF1 b\xE1o th\u1EDDi ti\u1EBFt tr\xEAn tivi, chi\u1EBFc tivi \u0111\xF3ng vai tr\xF2 l\xE0 g\xEC?",
    "options": [
      {
        "id": "opt_t6_ot_9_a",
        "text": "Thi\u1EBFt b\u1ECB k\u1EBFt n\u1ED1i m\u1EA1ng.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_9_b",
        "text": "D\u1EEF li\u1EC7u th\u1EDDi ti\u1EBFt.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_9_c",
        "text": "V\u1EADt mang tin.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_9_d",
        "text": "B\u1ED9 x\u1EED l\xED th\xF4ng tin.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_1_thong_tin_va_du_lieu"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_10",
    "type": "single_choice",
    "prompt": "Ph\xE1t bi\u1EC3u: 'Theo b\u1EA3ng th\u1ED1ng k\xEA, th\xE1ng 6 \u0110\xE0 N\u1EB5ng \xEDt m\u01B0a nh\u1EA5t so v\u1EDBi H\xE0 N\u1ED9i, Hu\u1EBF' l\xE0:",
    "options": [
      {
        "id": "opt_t6_ot_10_a",
        "text": "V\u1EADt mang tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_10_b",
        "text": "D\u1EEF li\u1EC7u.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_10_c",
        "text": "B\u1ED9 nh\u1EDB.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_10_d",
        "text": "Th\xF4ng tin.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_1_thong_tin_va_du_lieu"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_11",
    "type": "single_choice",
    "prompt": "M\u1ED9t em b\xE9 3 tu\u1ED5i nh\xECn th\u1EA5y d\xF2ng ch\u1EEF 'C\u1EA4M L\u1EECA' tr\xEAn bi\u1EC3n c\u1EA3nh b\xE1o nh\u01B0ng kh\xF4ng hi\u1EC3u \xFD ngh\u0129a. \u0110\u1ED1i v\u1EDBi em b\xE9, d\xF2ng ch\u1EEF \u0111\xF3 l\xE0:",
    "options": [
      {
        "id": "opt_t6_ot_11_a",
        "text": "Th\xF4ng tin quan tr\u1ECDng.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_11_b",
        "text": "D\u1EEF li\u1EC7u nh\u01B0ng kh\xF4ng \u0111em l\u1EA1i th\xF4ng tin.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_11_c",
        "text": "V\u1EADt mang tin v\xF4 h\xECnh.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_11_d",
        "text": "B\u1ED9 x\u1EED l\xED th\xF4ng tin.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_1_thong_tin_va_du_lieu"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_12",
    "type": "single_choice",
    "prompt": "Qu\xE1 tr\xECnh x\u1EED l\xED th\xF4ng tin c\u1EE7a con ng\u01B0\u1EDDi g\u1ED3m bao nhi\xEAu ho\u1EA1t \u0111\u1ED9ng c\u01A1 b\u1EA3n?",
    "options": [
      {
        "id": "opt_t6_ot_12_a",
        "text": "2 ho\u1EA1t \u0111\u1ED9ng.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_12_b",
        "text": "3 ho\u1EA1t \u0111\u1ED9ng.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_12_c",
        "text": "4 ho\u1EA1t \u0111\u1ED9ng.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_12_d",
        "text": "5 ho\u1EA1t \u0111\u1ED9ng.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_2_xu_li_thong_tin"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_13",
    "type": "single_choice",
    "prompt": "C\xE1c ho\u1EA1t \u0111\u1ED9ng c\u01A1 b\u1EA3n c\u1EE7a qu\xE1 tr\xECnh x\u1EED l\xED th\xF4ng tin theo th\u1EE9 t\u1EF1 h\u1EE3p l\xED th\u01B0\u1EDDng l\xE0:",
    "options": [
      {
        "id": "opt_t6_ot_13_a",
        "text": "L\u01B0u tr\u1EEF -> X\u1EED l\xED -> Truy\u1EC1n -> Thu nh\u1EADn.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_13_b",
        "text": "Thu nh\u1EADn -> L\u01B0u tr\u1EEF -> X\u1EED l\xED -> Truy\u1EC1n.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_13_c",
        "text": "X\u1EED l\xED -> Thu nh\u1EADn -> L\u01B0u tr\u1EEF -> Truy\u1EC1n.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_13_d",
        "text": "Truy\u1EC1n -> X\u1EED l\xED -> Thu nh\u1EADn -> L\u01B0u tr\u1EEF.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_2_xu_li_thong_tin"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_14",
    "type": "single_choice",
    "prompt": "M\xE1y t\xEDnh g\u1ED3m bao nhi\xEAu th\xE0nh ph\u1EA7n ch\xEDnh \u0111\u1EC3 th\u1EF1c hi\u1EC7n c\xE1c ho\u1EA1t \u0111\u1ED9ng x\u1EED l\xED th\xF4ng tin?",
    "options": [
      {
        "id": "opt_t6_ot_14_a",
        "text": "3 (Thi\u1EBFt b\u1ECB v\xE0o, thi\u1EBFt b\u1ECB ra, ph\u1EA7n m\u1EC1m).",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_14_b",
        "text": "4 (Thi\u1EBFt b\u1ECB v\xE0o, b\u1ED9 nh\u1EDB, b\u1ED9 x\u1EED l\xED, thi\u1EBFt b\u1ECB ra).",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_14_c",
        "text": "2 (Ph\u1EA7n c\u1EE9ng, Ph\u1EA7n m\u1EC1m).",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_14_d",
        "text": "5 (B\xE0n ph\xEDm, chu\u1ED9t, CPU, m\xE0n h\xECnh, m\xE1y in).",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_2_xu_li_thong_tin"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_15",
    "type": "single_choice",
    "prompt": "Trong m\xE1y t\xEDnh, thi\u1EBFt b\u1ECB n\xE0o sau \u0111\xE2y d\xF9ng \u0111\u1EC3 thu nh\u1EADn th\xF4ng tin (thi\u1EBFt b\u1ECB v\xE0o)?",
    "options": [
      {
        "id": "opt_t6_ot_15_a",
        "text": "B\xE0n ph\xEDm, chu\u1ED9t, m\xE1y qu\xE9t.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_15_b",
        "text": "M\xE0n h\xECnh, m\xE1y in, loa.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_15_c",
        "text": "B\u1ED9 x\u1EED l\xED (CPU).",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_15_d",
        "text": "\u0110\u0129a c\u1EE9ng, \u0111\u0129a quang, th\u1EBB nh\u1EDB.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_2_xu_li_thong_tin"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_16",
    "type": "single_choice",
    "prompt": "B\u1ED9 nh\u1EDB trong m\xE1y t\xEDnh th\u1EF1c hi\u1EC7n ch\u1EE9c n\u0103ng g\xEC?",
    "options": [
      {
        "id": "opt_t6_ot_16_a",
        "text": "Thu nh\u1EADn th\xF4ng tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_16_b",
        "text": "X\u1EED l\xED th\xF4ng tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_16_c",
        "text": "Truy\u1EC1n th\xF4ng tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_16_d",
        "text": "L\u01B0u tr\u1EEF th\xF4ng tin.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_2_xu_li_thong_tin"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_17",
    "type": "single_choice",
    "prompt": "B\u1ED9 ph\u1EADn n\xE0o \u0111\u01B0\u1EE3c v\xED nh\u01B0 'b\u1ED9 n\xE3o' c\u1EE7a m\xE1y t\xEDnh, \u0111\xF3ng vai tr\xF2 x\u1EED l\xED th\xF4ng tin?",
    "options": [
      {
        "id": "opt_t6_ot_17_a",
        "text": "B\u1ED9 nh\u1EDB (RAM, \u1ED4 c\u1EE9ng).",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_17_b",
        "text": "B\u1ED9 x\u1EED l\xED (CPU).",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_17_c",
        "text": "Thi\u1EBFt b\u1ECB v\xE0o (B\xE0n ph\xEDm, chu\u1ED9t).",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_17_d",
        "text": "Thi\u1EBFt b\u1ECB ra (M\xE0n h\xECnh).",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_2_xu_li_thong_tin"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_18",
    "type": "single_choice",
    "prompt": "Thi\u1EBFt b\u1ECB ra c\u1EE7a m\xE1y t\xEDnh (nh\u01B0 m\xE0n h\xECnh, m\xE1y in) t\u01B0\u01A1ng \u1EE9ng v\u1EDBi ho\u1EA1t \u0111\u1ED9ng n\xE0o trong qu\xE1 tr\xECnh x\u1EED l\xED th\xF4ng tin?",
    "options": [
      {
        "id": "opt_t6_ot_18_a",
        "text": "Thu nh\u1EADn th\xF4ng tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_18_b",
        "text": "X\u1EED l\xED th\xF4ng tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_18_c",
        "text": "Truy\u1EC1n/chia s\u1EBB th\xF4ng tin.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_18_d",
        "text": "L\u01B0u tr\u1EEF th\xF4ng tin.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_2_xu_li_thong_tin"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_19",
    "type": "single_choice",
    "prompt": "Vi\u1EC7c em ch\xE9p b\xE0i tr\xEAn b\u1EA3ng v\xE0o v\u1EDF l\xE0 ho\u1EA1t \u0111\u1ED9ng n\xE0o trong qu\xE1 tr\xECnh x\u1EED l\xED th\xF4ng tin?",
    "options": [
      {
        "id": "opt_t6_ot_19_a",
        "text": "Thu nh\u1EADn th\xF4ng tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_19_b",
        "text": "X\u1EED l\xED th\xF4ng tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_19_c",
        "text": "L\u01B0u tr\u1EEF th\xF4ng tin.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_19_d",
        "text": "Truy\u1EC1n th\xF4ng tin.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_2_xu_li_thong_tin"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_20",
    "type": "single_choice",
    "prompt": "Em \u0111ang nghe ch\u01B0\u01A1ng tr\xECnh ca nh\u1EA1c tr\xEAn \u0111\xE0i ph\xE1t thanh. Ho\u1EA1t \u0111\u1ED9ng nghe ca nh\u1EA1c n\xE0y l\xE0:",
    "options": [
      {
        "id": "opt_t6_ot_20_a",
        "text": "Thu nh\u1EADn th\xF4ng tin.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_20_b",
        "text": "X\u1EED l\xED th\xF4ng tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_20_c",
        "text": "Truy\u1EC1n th\xF4ng tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_20_d",
        "text": "L\u01B0u tr\u1EEF th\xF4ng tin.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_2_xu_li_thong_tin"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_21",
    "type": "single_choice",
    "prompt": "N\xE3o c\u1EE7a c\u1EA7u th\u1EE7 ph\xE2n t\xEDch v\u1ECB tr\xED th\u1EE7 m\xF4n \u0111\u1EC3 s\xFAt b\xF3ng v\xE0o g\xF3c khung th\xE0nh h\u1EDF nh\u1EA5t. \u0110\xE2y l\xE0 ho\u1EA1t \u0111\u1ED9ng:",
    "options": [
      {
        "id": "opt_t6_ot_21_a",
        "text": "Thu nh\u1EADn th\xF4ng tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_21_b",
        "text": "L\u01B0u tr\u1EEF th\xF4ng tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_21_c",
        "text": "X\u1EED l\xED th\xF4ng tin.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_21_d",
        "text": "Truy\u1EC1n th\xF4ng tin.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_2_xu_li_thong_tin"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_22",
    "type": "single_choice",
    "prompt": "Vi\u1EC7c em thuy\u1EBFt tr\xECnh ch\u1EE7 \u0111\u1EC1 t\xECnh b\u1EA1n tr\u01B0\u1EDBc to\xE0n l\u1EDBp thu\u1ED9c ho\u1EA1t \u0111\u1ED9ng n\xE0o?",
    "options": [
      {
        "id": "opt_t6_ot_22_a",
        "text": "Thu nh\u1EADn th\xF4ng tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_22_b",
        "text": "Truy\u1EC1n th\xF4ng tin.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_22_c",
        "text": "X\u1EED l\xED th\xF4ng tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_22_d",
        "text": "B\u1ED9 nh\u1EDB th\xF4ng tin.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_2_xu_li_thong_tin"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_23",
    "type": "single_choice",
    "prompt": "\u0110\u1EB7c \u0111i\u1EC3m n\xE0o sau \u0111\xE2y KH\xD4NG ph\u1EA3i l\xE0 \u01B0u \u0111i\u1EC3m c\u1EE7a m\xE1y t\xEDnh so v\u1EDBi con ng\u01B0\u1EDDi khi x\u1EED l\xED th\xF4ng tin?",
    "options": [
      {
        "id": "opt_t6_ot_23_a",
        "text": "T\xEDnh to\xE1n v\u1EDBi t\u1ED1c \u0111\u1ED9 cao, ch\xEDnh x\xE1c.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_23_b",
        "text": "L\xE0m vi\u1EC7c li\xEAn t\u1EE5c b\u1EC1n b\u1EC9 ng\xE0y \u0111\xEAm.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_23_c",
        "text": "C\xF3 kh\u1EA3 n\u0103ng t\u1EF1 t\u01B0 duy, s\xE1ng t\u1EA1o ra \xFD t\u01B0\u1EDFng m\u1EDBi nh\u01B0 con ng\u01B0\u1EDDi.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_23_d",
        "text": "L\u01B0u tr\u1EEF \u0111\u01B0\u1EE3c l\u01B0\u1EE3ng th\xF4ng tin kh\u1ED5ng l\u1ED3 trong kh\xF4ng gian nh\u1ECF.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_2_xu_li_thong_tin"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_24",
    "type": "single_choice",
    "prompt": "Th\xF4ng tin trong m\xE1y t\xEDnh th\xF4ng d\u1EE5ng hi\u1EC7n nay \u0111\u01B0\u1EE3c bi\u1EC3u di\u1EC5n b\u1EB1ng c\xE1c k\xED hi\u1EC7u n\xE0o?",
    "options": [
      {
        "id": "opt_t6_ot_24_a",
        "text": "C\xE1c s\u1ED1 t\u1EEB 0 \u0111\u1EBFn 9.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_24_b",
        "text": "C\xE1c ch\u1EEF c\xE1i t\u1EEB A \u0111\u1EBFn Z.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_24_c",
        "text": "Hai k\xED hi\u1EC7u 0 v\xE0 1.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_24_d",
        "text": "H\u1EC7 th\u1ED1ng c\xE1c m\xE3 v\u1EA1ch.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_3_thong_tin_trong_may_tinh"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_25",
    "type": "single_choice",
    "prompt": "\u0110\u01A1n v\u1ECB nh\u1ECF nh\u1EA5t \u0111\u1EC3 l\u01B0u tr\u1EEF th\xF4ng tin trong m\xE1y t\xEDnh l\xE0 g\xEC?",
    "options": [
      {
        "id": "opt_t6_ot_25_a",
        "text": "Byte.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_25_b",
        "text": "Bit.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_25_c",
        "text": "Kilobyte.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_25_d",
        "text": "Megabyte.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_3_thong_tin_trong_may_tinh"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_26",
    "type": "single_choice",
    "prompt": "1 Byte c\xF3 gi\xE1 tr\u1ECB b\u1EB1ng bao nhi\xEAu bit?",
    "options": [
      {
        "id": "opt_t6_ot_26_a",
        "text": "2 bit.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_26_b",
        "text": "8 bit.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_26_c",
        "text": "10 bit.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_26_d",
        "text": "1024 bit.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_3_thong_tin_trong_may_tinh"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_27",
    "type": "single_choice",
    "prompt": "D\xE3y bit l\xE0 g\xEC?",
    "options": [
      {
        "id": "opt_t6_ot_27_a",
        "text": "D\xE3y g\u1ED3m c\xE1c s\u1ED1 t\u1EEB 0 \u0111\u1EBFn 9.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_27_b",
        "text": "D\xE3y g\u1ED3m c\xE1c k\xED t\u1EF1 b\u1EA3ng ch\u1EEF c\xE1i.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_27_c",
        "text": "D\xE3y g\u1ED3m nh\u1EEFng k\xED hi\u1EC7u 0 v\xE0 1.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_27_d",
        "text": "B\u1EA3ng m\xE3 v\u0103n b\u1EA3n n\u1ED9i b\u1ED9.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_3_thong_tin_trong_may_tinh"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_28",
    "type": "single_choice",
    "prompt": "1 Kilobyte (KB) x\u1EA5p x\u1EC9 b\u1EB1ng bao nhi\xEAu byte?",
    "options": [
      {
        "id": "opt_t6_ot_28_a",
        "text": "1 ngh\xECn byte.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_28_b",
        "text": "1 tri\u1EC7u byte.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_28_c",
        "text": "1 t\u1EC9 byte.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_28_d",
        "text": "1 ngh\xECn t\u1EC9 byte.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_3_thong_tin_trong_may_tinh"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_29",
    "type": "single_choice",
    "prompt": "Trong c\xE1c \u0111\u01A1n v\u1ECB \u0111o dung l\u01B0\u1EE3ng th\xF4ng tin sau, \u0111\u01A1n v\u1ECB n\xE0o l\u1EDBn nh\u1EA5t?",
    "options": [
      {
        "id": "opt_t6_ot_29_a",
        "text": "Byte (B).",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_29_b",
        "text": "Megabyte (MB).",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_29_c",
        "text": "Gigabyte (GB).",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_29_d",
        "text": "Terabyte (TB).",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_3_thong_tin_trong_may_tinh"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_30",
    "type": "single_choice",
    "prompt": "H\xECnh \u1EA3nh k\u0129 thu\u1EADt s\u1ED1 trong m\xE1y t\xEDnh \u0111\u01B0\u1EE3c c\u1EA5u t\u1EA1o t\u1EEB \u0111\xE2u?",
    "options": [
      {
        "id": "opt_t6_ot_30_a",
        "text": "C\xE1c \u0111\u01B0\u1EDDng th\u1EB3ng v\xE0 \u0111\u01B0\u1EDDng cong.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_30_b",
        "text": "C\xE1c m\u1EA3nh gh\xE9p v\u1EADt l\xED.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_30_c",
        "text": "C\xE1c \u0111i\u1EC3m \u1EA3nh (pixel).",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_30_d",
        "text": "C\xE1c m\xE3 m\xE0u n\u01B0\u1EDBc.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_3_thong_tin_trong_may_tinh"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_31",
    "type": "single_choice",
    "prompt": "\u0110\u1EC3 m\xE1y t\xEDnh c\xF3 th\u1EC3 x\u1EED l\xED \u0111\u01B0\u1EE3c v\u0103n b\u1EA3n, h\xECnh \u1EA3nh, \xE2m thanh, t\u1EA5t c\u1EA3 c\xE1c d\u1EEF li\u1EC7u n\xE0y c\u1EA7n \u0111\u01B0\u1EE3c:",
    "options": [
      {
        "id": "opt_t6_ot_31_a",
        "text": "In ra gi\u1EA5y.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_31_b",
        "text": "Chuy\u1EC3n \u0111\u1ED5i th\xE0nh d\xE3y bit.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_31_c",
        "text": "Chuy\u1EC3n th\xE0nh ng\xF4n ng\u1EEF Ti\u1EBFng Vi\u1EC7t.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_31_d",
        "text": "Ph\xE2n lo\u1EA1i theo th\u01B0 m\u1EE5c ri\xEAng bi\u1EC7t.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_3_thong_tin_trong_may_tinh"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_32",
    "type": "single_choice",
    "prompt": "M\u1ED9t th\u1EBB nh\u1EDB c\xF3 dung l\u01B0\u1EE3ng 16 GB, m\u1ED9t b\u1EE9c \u1EA3nh ch\u1EE5p c\xF3 dung l\u01B0\u1EE3ng kho\u1EA3ng 12 MB. Th\u1EBB nh\u1EDB \u0111\xF3 ch\u1EE9a \u0111\u01B0\u1EE3c kho\u1EA3ng bao nhi\xEAu b\u1EE9c \u1EA3nh? (Bi\u1EBFt 1 GB = 1024 MB)",
    "options": [
      {
        "id": "opt_t6_ot_32_a",
        "text": "Kho\u1EA3ng 133 b\u1EE9c \u1EA3nh.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_32_b",
        "text": "Kho\u1EA3ng 1024 b\u1EE9c \u1EA3nh.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_32_c",
        "text": "Kho\u1EA3ng 1365 b\u1EE9c \u1EA3nh.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_32_d",
        "text": "Kho\u1EA3ng 2048 b\u1EE9c \u1EA3nh.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_3_thong_tin_trong_may_tinh"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_33",
    "type": "single_choice",
    "prompt": "D\u1EEF li\u1EC7u \u0111\u01B0\u1EE3c l\u01B0u tr\u1EEF tr\xEAn \u0111\u0129a quang (CD, DVD) ho\u1EB7c th\u1EBB nh\u1EDB \u0111\u01B0\u1EE3c x\u1EBFp v\xE0o th\xE0nh ph\u1EA7n n\xE0o c\u1EE7a h\u1EC7 th\u1ED1ng x\u1EED l\xED th\xF4ng tin m\xE1y t\xEDnh?",
    "options": [
      {
        "id": "opt_t6_ot_33_a",
        "text": "B\u1ED9 nh\u1EDB trong.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_33_b",
        "text": "B\u1ED9 nh\u1EDB ngo\xE0i (Thi\u1EBFt b\u1ECB l\u01B0u tr\u1EEF th\xF4ng tin).",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_33_c",
        "text": "Thi\u1EBFt b\u1ECB v\xE0o.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_33_d",
        "text": "B\u1ED9 x\u1EED l\xED.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_3_thong_tin_trong_may_tinh"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_34",
    "type": "single_choice",
    "prompt": "K\xED t\u1EF1 'A' \u0111\u01B0\u1EE3c m\xE3 ho\xE1 trong m\xE1y t\xEDnh th\xE0nh d\xE3y 01000001. D\xE3y n\xE0y c\xF3 \u0111\u1ED9 d\xE0i l\xE0 bao nhi\xEAu?",
    "options": [
      {
        "id": "opt_t6_ot_34_a",
        "text": "1 bit.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_34_b",
        "text": "8 bit (1 byte).",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_34_c",
        "text": "8 byte.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_34_d",
        "text": "1 KB.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_3_thong_tin_trong_may_tinh"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_35",
    "type": "single_choice",
    "prompt": "M\u1EA1ng m\xE1y t\xEDnh l\xE0 g\xEC?",
    "options": [
      {
        "id": "opt_t6_ot_35_a",
        "text": "T\u1EADp h\u1EE3p c\xE1c thi\u1EBFt b\u1ECB \u0111i\u1EC7n t\u1EED trong m\u1ED9t c\u0103n nh\xE0.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_35_b",
        "text": "Hai hay nhi\u1EC1u m\xE1y t\xEDnh v\xE0 c\xE1c thi\u1EBFt b\u1ECB \u0111\u01B0\u1EE3c k\u1EBFt n\u1ED1i \u0111\u1EC3 truy\u1EC1n th\xF4ng tin cho nhau.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_35_c",
        "text": "M\u1EA1ng l\u01B0\u1EDBi \u0111\u01B0\u1EDDng b\u1ED9 n\u1ED1i c\xE1c th\xE0nh ph\u1ED1.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_35_d",
        "text": "Ph\u1EA7n m\u1EC1m gi\xFAp m\xE1y t\xEDnh k\u1EBFt n\u1ED1i Internet.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_4_mang_may_tinh"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_36",
    "type": "single_choice",
    "prompt": "C\xE1c th\xE0nh ph\u1EA7n ch\xEDnh c\u1EE7a m\u1ED9t m\u1EA1ng m\xE1y t\xEDnh bao g\u1ED3m:",
    "options": [
      {
        "id": "opt_t6_ot_36_a",
        "text": "C\xE1c thi\u1EBFt b\u1ECB \u0111\u1EA7u cu\u1ED1i, c\xE1c thi\u1EBFt b\u1ECB k\u1EBFt n\u1ED1i v\xE0 ph\u1EA7n m\u1EC1m m\u1EA1ng.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_36_b",
        "text": "B\xE0n ph\xEDm, chu\u1ED9t, m\xE0n h\xECnh v\xE0 h\u1EC7 \u0111i\u1EC1u h\xE0nh.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_36_c",
        "text": "D\xE2y c\xE1p m\u1EA1ng, \u0111i\u1EC7n tho\u1EA1i di \u0111\u1ED9ng v\xE0 m\xE1y in.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_36_d",
        "text": "M\u1EA1ng c\xF3 d\xE2y v\xE0 m\u1EA1ng kh\xF4ng d\xE2y.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_4_mang_may_tinh"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_37",
    "type": "single_choice",
    "prompt": "Thi\u1EBFt b\u1ECB n\xE0o sau \u0111\xE2y \u0111\u01B0\u1EE3c g\u1ECDi l\xE0 thi\u1EBFt b\u1ECB \u0111\u1EA7u cu\u1ED1i trong m\u1EA1ng m\xE1y t\xEDnh?",
    "options": [
      {
        "id": "opt_t6_ot_37_a",
        "text": "B\u1ED9 chia (Hub).",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_37_b",
        "text": "B\u1ED9 \u0111\u1ECBnh tuy\u1EBFn (Router).",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_37_c",
        "text": "D\xE2y d\u1EABn c\xE1p m\u1EA1ng.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_37_d",
        "text": "M\xE1y t\xEDnh \u0111\u1EC3 b\xE0n, \u0111i\u1EC7n tho\u1EA1i th\xF4ng minh, m\xE1y in.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_4_mang_may_tinh"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_38",
    "type": "single_choice",
    "prompt": "Thi\u1EBFt b\u1ECB n\xE0o sau \u0111\xE2y \u0111\xF3ng vai tr\xF2 l\xE0 thi\u1EBFt b\u1ECB k\u1EBFt n\u1ED1i trong m\u1EA1ng m\xE1y t\xEDnh?",
    "options": [
      {
        "id": "opt_t6_ot_38_a",
        "text": "M\xE1y t\xEDnh \u0111\u1EC3 b\xE0n.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_38_b",
        "text": "B\u1ED9 chuy\u1EC3n m\u1EA1ch (Switch), B\u1ED9 \u0111\u1ECBnh tuy\u1EBFn (Router).",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_38_c",
        "text": "Tai nghe kh\xF4ng d\xE2y.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_38_d",
        "text": "H\u1EC7 \u0111i\u1EC1u h\xE0nh m\xE1y t\xEDnh.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_4_mang_may_tinh"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_39",
    "type": "single_choice",
    "prompt": "Ph\u1EA7n m\u1EC1m m\u1EA1ng c\xF3 vai tr\xF2 g\xEC trong m\u1EA1ng m\xE1y t\xEDnh?",
    "options": [
      {
        "id": "opt_t6_ot_39_a",
        "text": "Duy tr\xEC quy t\u1EAFc, \u0111i\u1EC1u khi\u1EC3n qu\xE1 tr\xECnh truy\u1EC1n d\u1EEF li\u1EC7u tr\xEAn m\u1EA1ng.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_39_b",
        "text": "L\xE0 thi\u1EBFt b\u1ECB v\u1EADt l\xED \u0111\u1EC3 truy\u1EC1n t\xEDn hi\u1EC7u kh\xF4ng d\xE2y.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_39_c",
        "text": "L\xE0 n\u01A1i ng\u01B0\u1EDDi d\xF9ng thao t\xE1c l\u01B0u tr\u1EEF tr\u1EF1c ti\u1EBFp.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_39_d",
        "text": "Cung c\u1EA5p ngu\u1ED3n \u0111i\u1EC7n cho c\xE1c m\xE1y t\xEDnh trong m\u1EA1ng.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_4_mang_may_tinh"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_40",
    "type": "single_choice",
    "prompt": "M\u1ED9t trong nh\u1EEFng \u01B0u \u0111i\u1EC3m n\u1ED5i b\u1EADt c\u1EE7a k\u1EBFt n\u1ED1i m\u1EA1ng kh\xF4ng d\xE2y so v\u1EDBi m\u1EA1ng c\xF3 d\xE2y l\xE0 g\xEC?",
    "options": [
      {
        "id": "opt_t6_ot_40_a",
        "text": "Kh\xF4ng th\u1EC3 b\u1ECB \u1EA3nh h\u01B0\u1EDFng b\u1EDFi nhi\u1EC5u s\xF3ng ho\u1EB7c th\u1EDDi ti\u1EBFt.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_40_b",
        "text": "Thi\u1EBFt b\u1ECB c\xF3 th\u1EC3 linh ho\u1EA1t thay \u0111\u1ED5i v\u1ECB tr\xED m\xE0 v\u1EABn duy tr\xEC k\u1EBFt n\u1ED1i m\u1EA1ng.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_40_c",
        "text": "Lu\xF4n lu\xF4n mi\u1EC5n ph\xED c\u01B0\u1EDBc s\u1EED d\u1EE5ng.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_40_d",
        "text": "T\u1ED1c \u0111\u1ED9 truy\u1EC1n t\u1EA3i lu\xF4n cao h\u01A1n m\u1EA1ng c\xF3 d\xE2y trong m\u1ECDi ho\xE0n c\u1EA3nh.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_4_mang_may_tinh"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_41",
    "type": "single_choice",
    "prompt": "Vi\u1EC7c 5 m\xE1y t\xEDnh trong ph\xF2ng l\xE0m vi\u1EC7c c\xF9ng chia s\u1EBB \u0111\u1EC3 d\xF9ng chung m\u1ED9t chi\u1EBFc m\xE1y in minh ho\u1EA1 cho l\u1EE3i \xEDch n\xE0o c\u1EE7a m\u1EA1ng m\xE1y t\xEDnh?",
    "options": [
      {
        "id": "opt_t6_ot_41_a",
        "text": "Trao \u0111\u1ED5i d\u1EEF li\u1EC7u.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_41_b",
        "text": "Li\xEAn l\u1EA1c v\u1EDBi nhau.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_41_c",
        "text": "D\xF9ng chung c\xE1c thi\u1EBFt b\u1ECB tr\xEAn m\u1EA1ng.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_41_d",
        "text": "Truy c\u1EADp Internet t\u1ED1c \u0111\u1ED9 cao.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_4_mang_may_tinh"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_42",
    "type": "single_choice",
    "prompt": "B\u1EA1n Khoa g\u1EEDi m\u1ED9t t\u1EC7p b\xE1o c\xE1o b\u1EB1ng Word t\u1EEB m\xE1y t\xEDnh c\u1EE7a m\xECnh sang m\xE1y t\xEDnh c\u1EE7a b\u1EA1n An. \u0110\xE2y l\xE0 t\xEDnh n\u0103ng g\xEC c\u1EE7a m\u1EA1ng m\xE1y t\xEDnh?",
    "options": [
      {
        "id": "opt_t6_ot_42_a",
        "text": "D\xF9ng chung thi\u1EBFt b\u1ECB.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_42_b",
        "text": "\u0110i\u1EC1u khi\u1EC3n thi\u1EBFt b\u1ECB k\u1EBFt n\u1ED1i.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_42_c",
        "text": "Trao \u0111\u1ED5i d\u1EEF li\u1EC7u.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_42_d",
        "text": "B\u1EA3o m\u1EADt d\u1EEF li\u1EC7u m\u1EA1ng.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_4_mang_may_tinh"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_43",
    "type": "single_choice",
    "prompt": "\u0110\u01B0\u1EDDng truy\u1EC1n d\u1EEF li\u1EC7u 'kh\xF4ng nh\xECn th\u1EA5y' th\u01B0\u1EDDng s\u1EED d\u1EE5ng c\xF4ng ngh\u1EC7 n\xE0o \u0111\u1EC3 truy\u1EC1n t\xEDn hi\u1EC7u?",
    "options": [
      {
        "id": "opt_t6_ot_43_a",
        "text": "D\xE2y c\xE1p quang.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_43_b",
        "text": "D\xE2y c\xE1p \u0111\u1ED3ng.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_43_c",
        "text": "S\xF3ng v\xF4 tuy\u1EBFn (wifi, bluetooth...).",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_43_d",
        "text": "S\xF3ng si\xEAu \xE2m.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_4_mang_may_tinh"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_44",
    "type": "single_choice",
    "prompt": "Tr\u01B0\u1EDDng h\u1ECDc cung c\u1EA5p \u0111i\u1EC3m truy c\u1EADp m\u1EA1ng (Access Point) t\u1EA1i th\u01B0 vi\u1EC7n \u0111\u1EC3 h\u1ECDc sinh d\xF9ng \u0111i\u1EC7n tho\u1EA1i tra c\u1EE9u. \u0110\xE2y l\xE0 \u1EE9ng d\u1EE5ng c\u1EE7a lo\u1EA1i m\u1EA1ng n\xE0o?",
    "options": [
      {
        "id": "opt_t6_ot_44_a",
        "text": "M\u1EA1ng c\xF3 d\xE2y c\u1EE5c b\u1ED9.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_44_b",
        "text": "M\u1EA1ng kh\xF4ng d\xE2y.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_44_c",
        "text": "M\u1EA1ng vi\u1EC5n th\xF4ng c\u1ED1 \u0111\u1ECBnh.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_44_d",
        "text": "M\u1EA1ng l\u01B0\u1EDBi \u0111\u01B0\u1EDDng s\u1EAFt.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_4_mang_may_tinh"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_45",
    "type": "true_false",
    "prompt": "\u0110\u1ECDc c\xE1c ph\xE1t bi\u1EC3u sau v\u1EC1 'Th\xF4ng tin v\xE0 d\u1EEF li\u1EC7u':",
    "items": [
      {
        "id": "sub_t6_ot_45_a",
        "text": "Th\xF4ng tin l\xE0 nh\u1EEFng g\xEC \u0111em l\u1EA1i hi\u1EC3u bi\u1EBFt cho con ng\u01B0\u1EDDi v\u1EC1 th\u1EBF gi\u1EDBi xung quanh.",
        "is_correct": true
      },
      {
        "id": "sub_t6_ot_45_b",
        "text": "D\u1EEF li\u1EC7u l\xE0 th\xF4ng tin \u0111\u01B0\u1EE3c ghi l\xEAn v\u1EADt mang tin.",
        "is_correct": true
      },
      {
        "id": "sub_t6_ot_45_c",
        "text": "M\u1ECDi d\u1EEF li\u1EC7u (v\xED d\u1EE5 nh\u01B0 b\u1EA3n tin th\u1EDDi ti\u1EBFt) \u0111\u1EC1u mang l\u1EA1i th\xF4ng tin cho t\u1EA5t c\u1EA3 m\u1ECDi \u0111\u1ED1i t\u01B0\u1EE3ng ti\u1EBFp nh\u1EADn b\u1EA5t k\u1EC3 \u0111\u1ED9 tu\u1ED5i hay tr\xECnh \u0111\u1ED9.",
        "is_correct": false
      },
      {
        "id": "sub_t6_ot_45_d",
        "text": "T\u1EA5m b\u1EA3ng ghi gi\xE1 v\xE9 xe l\xE0 d\u1EEF li\u1EC7u, c\xF2n ch\u1EEF vi\u1EBFt tr\xEAn \u0111\xF3 l\xE0 v\u1EADt mang tin.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_1_thong_tin_va_du_lieu"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_46",
    "type": "true_false",
    "prompt": "\u0110\u1ECDc c\xE1c ph\xE1t bi\u1EC3u sau v\u1EC1 'Qu\xE1 tr\xECnh x\u1EED l\xED th\xF4ng tin c\u1EE7a con ng\u01B0\u1EDDi':",
    "items": [
      {
        "id": "sub_t6_ot_46_a",
        "text": "Qu\xE1 tr\xECnh x\u1EED l\xED th\xF4ng tin c\u1EE7a con ng\u01B0\u1EDDi ch\u1EC9 g\u1ED3m 3 ho\u1EA1t \u0111\u1ED9ng c\u01A1 b\u1EA3n: thu nh\u1EADn, x\u1EED l\xED v\xE0 truy\u1EC1n th\xF4ng tin.",
        "is_correct": false
      },
      {
        "id": "sub_t6_ot_46_b",
        "text": "\u1EDE ho\u1EA1t \u0111\u1ED9ng thu nh\u1EADn th\xF4ng tin, con ng\u01B0\u1EDDi nh\u1EADn th\xF4ng tin t\u1EEB th\u1EBF gi\u1EDBi b\xEAn ngo\xE0i nh\u1EDD v\xE0o c\xE1c gi\xE1c quan.",
        "is_correct": true
      },
      {
        "id": "sub_t6_ot_46_c",
        "text": "Th\xF4ng tin ch\u1EC9 \u0111\u01B0\u1EE3c l\u01B0u tr\u1EEF trong b\u1ED9 n\xE3o con ng\u01B0\u1EDDi, kh\xF4ng th\u1EC3 l\u01B0u tr\u1EEF b\u1EB1ng c\xE1ch ghi ch\xE9p ra ngo\xE0i.",
        "is_correct": false
      },
      {
        "id": "sub_t6_ot_46_d",
        "text": "Vi\u1EC7c b\u1ED9 n\xE3o li\xEAn k\u1EBFt c\xE1c th\xF4ng tin \u0111\xE3 c\xF3, so s\xE1nh, ph\xE2n t\xEDch \u0111\u1EC3 \u0111\u01B0a ra k\u1EBFt lu\u1EADn \u0111\u01B0\u1EE3c g\u1ECDi l\xE0 ho\u1EA1t \u0111\u1ED9ng x\u1EED l\xED th\xF4ng tin.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_2_xu_li_thong_tin"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_47",
    "type": "true_false",
    "prompt": "\u0110\u1ECDc c\xE1c ph\xE1t bi\u1EC3u sau v\u1EC1 'X\u1EED l\xED th\xF4ng tin trong m\xE1y t\xEDnh':",
    "items": [
      {
        "id": "sub_t6_ot_47_a",
        "text": "B\xE0n ph\xEDm, chu\u1ED9t m\xE1y t\xEDnh \u0111\xF3ng vai tr\xF2 l\xE0 c\xE1c thi\u1EBFt b\u1ECB thu nh\u1EADn th\xF4ng tin (thi\u1EBFt b\u1ECB v\xE0o).",
        "is_correct": true
      },
      {
        "id": "sub_t6_ot_47_b",
        "text": "M\xE0n h\xECnh m\xE1y t\xEDnh c\xF3 ch\u1EE9c n\u0103ng ph\xE2n t\xEDch, x\u1EED l\xED th\xF4ng tin gi\u1ED1ng nh\u01B0 b\u1ED9 n\xE3o c\u1EE7a con ng\u01B0\u1EDDi.",
        "is_correct": false
      },
      {
        "id": "sub_t6_ot_47_c",
        "text": "M\xE1y t\xEDnh c\xF3 \u01B0u \u0111i\u1EC3m v\u01B0\u1EE3t tr\u1ED9i l\xE0 t\xEDnh to\xE1n v\u1EDBi t\u1ED1c \u0111\u1ED9 r\u1EA5t cao, ch\xEDnh x\xE1c v\xE0 c\xF3 th\u1EC3 l\xE0m vi\u1EC7c b\u1EC1n b\u1EC9.",
        "is_correct": true
      },
      {
        "id": "sub_t6_ot_47_d",
        "text": "Kh\xE1c v\u1EDBi con ng\u01B0\u1EDDi, m\xE1y t\xEDnh hi\u1EC7n nay c\xF3 th\u1EC3 d\u1EC5 d\xE0ng thu nh\u1EADn tr\u1EF1c ti\u1EBFp th\xF4ng tin v\u1EC1 m\xF9i v\u1ECB nh\u1EDD b\u1ED9 x\u1EED l\xED CPU.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_2_xu_li_thong_tin"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_48",
    "type": "true_false",
    "prompt": "\u0110\u1ECDc c\xE1c ph\xE1t bi\u1EC3u sau v\u1EC1 'Bi\u1EC3u di\u1EC5n v\xE0 \u0111o l\u01B0\u1EE3ng th\xF4ng tin trong m\xE1y t\xEDnh':",
    "items": [
      {
        "id": "sub_t6_ot_48_a",
        "text": "Trong m\xE1y t\xEDnh, m\u1ECDi lo\u1EA1i th\xF4ng tin (v\u0103n b\u1EA3n, h\xECnh \u1EA3nh, \xE2m thanh) \u0111\u1EC1u \u0111\u01B0\u1EE3c chuy\u1EC3n th\xE0nh d\xE3y c\xE1c k\xED hi\u1EC7u 0 v\xE0 1.",
        "is_correct": true
      },
      {
        "id": "sub_t6_ot_48_b",
        "text": "Bit l\xE0 \u0111\u01A1n v\u1ECB l\u1EDBn nh\u1EA5t d\xF9ng \u0111\u1EC3 \u0111o dung l\u01B0\u1EE3ng th\xF4ng tin.",
        "is_correct": false
      },
      {
        "id": "sub_t6_ot_48_c",
        "text": "Trong bi\u1EC3u di\u1EC5n h\xECnh \u1EA3nh \u0111en tr\u1EAFng, m\u1ED7i \u0111i\u1EC3m \u1EA3nh (pixel) b\u1EAFt bu\u1ED9c ph\u1EA3i d\xF9ng 8 bit \u0111\u1EC3 bi\u1EC3u di\u1EC5n.",
        "is_correct": false
      },
      {
        "id": "sub_t6_ot_48_d",
        "text": "\u0110\u01A1n v\u1ECB 1 Kilobyte (KB) c\xF3 gi\xE1 tr\u1ECB x\u1EA5p x\u1EC9 1 ngh\xECn byte (ch\xEDnh x\xE1c l\xE0 1024 byte).",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_3_thong_tin_trong_may_tinh"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_49",
    "type": "true_false",
    "prompt": "\u0110\u1ECDc c\xE1c ph\xE1t bi\u1EC3u sau v\u1EC1 'M\u1EA1ng m\xE1y t\xEDnh':",
    "items": [
      {
        "id": "sub_t6_ot_49_a",
        "text": "M\u1EA1ng m\xE1y t\xEDnh l\xE0 m\u1EA1ng l\u01B0\u1EDBi g\u1ED3m hai hay nhi\u1EC1u m\xE1y t\xEDnh v\xE0 thi\u1EBFt b\u1ECB \u0111\u01B0\u1EE3c k\u1EBFt n\u1ED1i \u0111\u1EC3 truy\u1EC1n th\xF4ng tin cho nhau.",
        "is_correct": true
      },
      {
        "id": "sub_t6_ot_49_b",
        "text": "L\u1EE3i \xEDch c\u1EE7a m\u1EA1ng m\xE1y t\xEDnh ch\u1EC9 d\u1EEBng l\u1EA1i \u1EDF vi\u1EC7c d\xF9ng chung m\xE1y in, kh\xF4ng th\u1EC3 trao \u0111\u1ED5i c\xE1c t\u1EC7p tin qua l\u1EA1i.",
        "is_correct": false
      },
      {
        "id": "sub_t6_ot_49_c",
        "text": "Vi\u1EC7c chia s\u1EBB d\u1EEF li\u1EC7u qua m\u1EA1ng gi\xFAp ng\u01B0\u1EDDi d\xF9ng d\u1EC5 d\xE0ng g\u1EEDi m\u1ED9t t\u1EC7p \u1EA3nh cho nhau m\xE0 kh\xF4ng c\u1EA7n ch\xE9p qua USB.",
        "is_correct": true
      },
      {
        "id": "sub_t6_ot_49_d",
        "text": "Ph\u1EA7n m\u1EC1m m\u1EA1ng c\xF3 vai tr\xF2 nh\u01B0 lu\u1EADt l\u1EC7 giao th\xF4ng, gi\xFAp \u0111i\u1EC1u khi\u1EC3n qu\xE1 tr\xECnh truy\u1EC1n d\u1EEF li\u1EC7u.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_4_mang_may_tinh"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin6_ot_50",
    "type": "true_false",
    "prompt": "\u0110\u1ECDc c\xE1c ph\xE1t bi\u1EC3u sau v\u1EC1 'Th\xE0nh ph\u1EA7n m\u1EA1ng v\xE0 k\u1EBFt n\u1ED1i m\u1EA1ng':",
    "items": [
      {
        "id": "sub_t6_ot_50_a",
        "text": "M\xE1y t\xEDnh \u0111\u1EC3 b\xE0n, \u0111i\u1EC7n tho\u1EA1i di \u0111\u1ED9ng th\xF4ng minh \u0111\u01B0\u1EE3c x\u1EBFp v\xE0o nh\xF3m thi\u1EBFt b\u1ECB \u0111\u1EA7u cu\u1ED1i c\u1EE7a m\u1EA1ng m\xE1y t\xEDnh.",
        "is_correct": true
      },
      {
        "id": "sub_t6_ot_50_b",
        "text": "B\u1ED9 \u0111\u1ECBnh tuy\u1EBFn (Router) v\xE0 \u0110i\u1EC3m truy c\u1EADp kh\xF4ng d\xE2y (Access Point) l\xE0 c\xE1c thi\u1EBFt b\u1ECB k\u1EBFt n\u1ED1i.",
        "is_correct": true
      },
      {
        "id": "sub_t6_ot_50_c",
        "text": "S\u1EED d\u1EE5ng m\u1EA1ng c\xF3 d\xE2y s\u1EBD tr\xE1nh \u0111\u01B0\u1EE3c ho\xE0n to\xE0n c\xE1c s\u1EF1 c\u1ED1 nh\u01B0 \u0111\u1EE9t d\xE2y do chu\u1ED9t c\u1EAFn hay m\u01B0a b\xE3o so v\u1EDBi m\u1EA1ng kh\xF4ng d\xE2y.",
        "is_correct": false
      },
      {
        "id": "sub_t6_ot_50_d",
        "text": "M\u1EA1ng kh\xF4ng d\xE2y gi\xFAp c\xE1c thi\u1EBFt b\u1ECB (nh\u01B0 \u0111i\u1EC7n tho\u1EA1i, laptop) c\xF3 th\u1EC3 linh ho\u1EA1t thay \u0111\u1ED5i v\u1ECB tr\xED m\xE0 v\u1EABn duy tr\xEC \u0111\u01B0\u1EE3c k\u1EBFt n\u1ED1i m\u1EA1ng.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_4_mang_may_tinh"
    ],
    "grade": "L\u1EDBp 6",
    "subject": "Tin h\u1ECDc",
    "term": "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn"
  },
  {
    "id": "q_tin7_gk1_1",
    "type": "single_choice",
    "prompt": "Thi\u1EBFt b\u1ECB v\xE0o - ra \u0111\xF3ng vai tr\xF2 g\xEC trong h\u1EC7 th\u1ED1ng m\xE1y t\xEDnh?",
    "options": [
      {
        "id": "opt_t7_gk1_1_a",
        "text": "Ch\u1EC9 cung c\u1EA5p ngu\u1ED3n \u0111i\u1EC7n cho m\xE1y t\xEDnh.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_1_b",
        "text": "\u0110i\u1EC1u khi\u1EC3n to\xE0n b\u1ED9 ho\u1EA1t \u0111\u1ED9ng c\u1EE7a ph\u1EA7n m\u1EC1m.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_1_c",
        "text": "Gi\xFAp m\xE1y t\xEDnh trao \u0111\u1ED5i d\u1EEF li\u1EC7u v\u1EDBi th\u1EBF gi\u1EDBi b\xEAn ngo\xE0i.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_1_d",
        "text": "Ch\u1EC9 x\u1EED l\xED d\u1EEF li\u1EC7u b\xEAn trong m\xE1y t\xEDnh.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_1_thiet_bi_vao_ra"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_2",
    "type": "single_choice",
    "prompt": "Thi\u1EBFt b\u1ECB n\xE0o sau \u0111\xE2y d\xF9ng \u0111\u1EC3 ti\u1EBFp nh\u1EADn th\xF4ng tin v\xE0 chuy\u1EC3n v\xE0o m\xE1y t\xEDnh (thi\u1EBFt b\u1ECB v\xE0o)?",
    "options": [
      {
        "id": "opt_t7_gk1_2_a",
        "text": "B\u1ED9 x\u1EED l\xED trung t\xE2m (CPU).",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_2_b",
        "text": "B\xE0n ph\xEDm, chu\u1ED9t, micro.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_2_c",
        "text": "M\xE0n h\xECnh, m\xE1y in, loa.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_2_d",
        "text": "M\xE1y chi\u1EBFu, tai nghe.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_1_thiet_bi_vao_ra"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_3",
    "type": "single_choice",
    "prompt": "Thi\u1EBFt b\u1ECB n\xE0o sau \u0111\xE2y nh\u1EADn th\xF4ng tin t\u1EEB m\xE1y t\xEDnh \u0111\u01B0a ra b\xEAn ngo\xE0i (thi\u1EBFt b\u1ECB ra)?",
    "options": [
      {
        "id": "opt_t7_gk1_3_a",
        "text": "\u1ED4 \u0111\u0129a c\u1EE9ng.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_3_b",
        "text": "Micro, m\xE1y qu\xE9t.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_3_c",
        "text": "M\xE1y in, loa, m\xE0n h\xECnh.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_3_d",
        "text": "Chu\u1ED9t, b\xE0n ph\xEDm.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_1_thiet_bi_vao_ra"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_4",
    "type": "single_choice",
    "prompt": "M\xE1y chi\u1EBFu thu\u1ED9c lo\u1EA1i thi\u1EBFt b\u1ECB n\xE0o?",
    "options": [
      {
        "id": "opt_t7_gk1_4_a",
        "text": "Thi\u1EBFt b\u1ECB ra.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_4_b",
        "text": "Thi\u1EBFt b\u1ECB x\u1EED l\xED.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_4_c",
        "text": "Thi\u1EBFt b\u1ECB v\xE0o.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_4_d",
        "text": "Thi\u1EBFt b\u1ECB l\u01B0u tr\u1EEF.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_1_thiet_bi_vao_ra"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_5",
    "type": "single_choice",
    "prompt": "H\u1EC7 \u0111i\u1EC1u h\xE0nh l\xE0 g\xEC?",
    "options": [
      {
        "id": "opt_t7_gk1_5_a",
        "text": "L\xE0 m\u1ED9t lo\u1EA1i thi\u1EBFt b\u1ECB ph\u1EA7n c\u1EE9ng c\u1EE7a m\xE1y t\xEDnh.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_5_b",
        "text": "L\xE0 ph\u1EA7n m\u1EC1m h\u1EC7 th\u1ED1ng qu\u1EA3n l\xED, \u0111i\u1EC1u khi\u1EC3n ho\u1EA1t \u0111\u1ED9ng chung c\u1EE7a m\xE1y t\xEDnh v\xE0 qu\u1EA3n l\xED d\u1EEF li\u1EC7u.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_5_c",
        "text": "L\xE0 trang web d\xF9ng \u0111\u1EC3 t\xECm ki\u1EBFm th\xF4ng tin.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_5_d",
        "text": "L\xE0 ph\u1EA7n m\u1EC1m \u1EE9ng d\u1EE5ng d\xF9ng \u0111\u1EC3 g\xF5 v\u0103n b\u1EA3n.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_2_he_dieu_hanh_va_phan_mem"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_6",
    "type": "single_choice",
    "prompt": "Ph\u1EA7n m\u1EC1m n\xE0o sau \u0111\xE2y L\xC0 m\u1ED9t h\u1EC7 \u0111i\u1EC1u h\xE0nh?",
    "options": [
      {
        "id": "opt_t7_gk1_6_a",
        "text": "Zalo.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_6_b",
        "text": "Google Chrome.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_6_c",
        "text": "Microsoft Word.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_6_d",
        "text": "Windows 10.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_2_he_dieu_hanh_va_phan_mem"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_7",
    "type": "single_choice",
    "prompt": "Ch\u1EE9c n\u0103ng n\xE0o sau \u0111\xE2y KH\xD4NG ph\u1EA3i l\xE0 ch\u1EE9c n\u0103ng c\u01A1 b\u1EA3n c\u1EE7a h\u1EC7 \u0111i\u1EC1u h\xE0nh?",
    "options": [
      {
        "id": "opt_t7_gk1_7_a",
        "text": "Tr\u1EF1c ti\u1EBFp ch\u1EC9nh s\u1EEDa hi\u1EC7u \u1EE9ng c\u1EE7a m\u1ED9t b\u1EE9c \u1EA3nh ngh\u1EC7 thu\u1EADt.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_7_b",
        "text": "Cung c\u1EA5p m\xF4i tr\u01B0\u1EDDng trao \u0111\u1ED5i th\xF4ng tin (giao di\u1EC7n) gi\u1EEFa ng\u01B0\u1EDDi v\xE0 m\xE1y.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_7_c",
        "text": "Qu\u1EA3n l\xED c\xE1c thi\u1EBFt b\u1ECB v\xE0 d\u1EEF li\u1EC7u c\u1EE7a m\xE1y t\xEDnh.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_7_d",
        "text": "Cung c\u1EA5p m\xF4i tr\u01B0\u1EDDng cho ph\xE9p ch\u1EA1y c\xE1c ph\u1EA7n m\u1EC1m \u1EE9ng d\u1EE5ng.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_2_he_dieu_hanh_va_phan_mem"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_8",
    "type": "single_choice",
    "prompt": "Ph\u1EA7n m\u1EC1m \u1EE9ng d\u1EE5ng c\xF3 \u0111\u1EB7c \u0111i\u1EC3m g\xEC?",
    "options": [
      {
        "id": "opt_t7_gk1_8_a",
        "text": "Ph\u1EA3i c\xE0i \u0111\u1EB7t \u0111\u1EA7u ti\xEAn \u0111\u1EC3 m\xE1y t\xEDnh ho\u1EA1t \u0111\u1ED9ng \u0111\u01B0\u1EE3c.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_8_b",
        "text": "Gi\xFAp con ng\u01B0\u1EDDi th\u1EF1c hi\u1EC7n nh\u1EEFng c\xF4ng vi\u1EC7c c\u1EE5 th\u1EC3 (so\u1EA1n v\u0103n b\u1EA3n, nghe nh\u1EA1c...).",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_8_c",
        "text": "L\xE0 ph\u1EA7n m\u1EC1m kh\xF4ng bao gi\u1EDD b\u1ECB l\u1ED7i.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_8_d",
        "text": "Qu\u1EA3n l\xED ph\u1EA7n c\u1EE9ng m\xE1y t\xEDnh tr\u1EF1c ti\u1EBFp.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_2_he_dieu_hanh_va_phan_mem"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_9",
    "type": "single_choice",
    "prompt": "T\u1EC7p c\xF3 ph\u1EA7n m\u1EDF r\u1ED9ng '.docx' ho\u1EB7c '.doc' th\u01B0\u1EDDng ch\u1EE9a d\u1EEF li\u1EC7u thu\u1ED9c lo\u1EA1i n\xE0o?",
    "options": [
      {
        "id": "opt_t7_gk1_9_a",
        "text": "H\xECnh \u1EA3nh.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_9_b",
        "text": "V\u0103n b\u1EA3n.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_9_c",
        "text": "\xC2m thanh.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_9_d",
        "text": "Video.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_3_quan_li_du_lieu_tep_va_thu_muc"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_10",
    "type": "single_choice",
    "prompt": "\u0110\u1EC3 nh\u1EADn bi\u1EBFt m\u1ED9t t\u1EC7p thu\u1ED9c lo\u1EA1i g\xEC v\xE0 d\xF9ng ph\u1EA7n m\u1EC1m n\xE0o \u0111\u1EC3 m\u1EDF, h\u1EC7 \u0111i\u1EC1u h\xE0nh th\u01B0\u1EDDng d\u1EF1a v\xE0o \u0111\xE2u?",
    "options": [
      {
        "id": "opt_t7_gk1_10_a",
        "text": "Ng\xE0y t\u1EA1o t\u1EC7p.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_10_b",
        "text": "T\xEAn ng\u01B0\u1EDDi t\u1EA1o ra t\u1EC7p.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_10_c",
        "text": "Ph\u1EA7n m\u1EDF r\u1ED9ng c\u1EE7a t\xEAn t\u1EC7p.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_10_d",
        "text": "K\xEDch th\u01B0\u1EDBc c\u1EE7a t\u1EC7p.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_3_quan_li_du_lieu_tep_va_thu_muc"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_11",
    "type": "single_choice",
    "prompt": "T\u1EC7p ch\u01B0\u01A1ng tr\xECnh m\xE1y t\xEDnh trong h\u1EC7 \u0111i\u1EC1u h\xE0nh Windows th\u01B0\u1EDDng c\xF3 ph\u1EA7n m\u1EDF r\u1ED9ng n\xE0o?",
    "options": [
      {
        "id": "opt_t7_gk1_11_a",
        "text": ".exe, .com, .bat, .msi",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_11_b",
        "text": ".jpg, .png",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_11_c",
        "text": ".mp3, .mp4",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_11_d",
        "text": ".doc, .docx",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_3_quan_li_du_lieu_tep_va_thu_muc"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_12",
    "type": "single_choice",
    "prompt": "Trong Windows 10, \u1EE9ng d\u1EE5ng n\xE0o gi\xFAp qu\u1EA3n l\xED t\u1EC7p v\xE0 th\u01B0 m\u1EE5c (t\u1EA1o, \u0111\u1ED5i t\xEAn, sao ch\xE9p, di chuy\u1EC3n, xo\xE1...)?",
    "options": [
      {
        "id": "opt_t7_gk1_12_a",
        "text": "Microsoft Paint.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_12_b",
        "text": "File Explorer.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_12_c",
        "text": "Control Panel.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_12_d",
        "text": "Task Manager.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_3_quan_li_du_lieu_tep_va_thu_muc"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_13",
    "type": "single_choice",
    "prompt": "C\xE1c k\xEAnh trao \u0111\u1ED5i th\xF4ng tin ph\u1ED5 bi\u1EBFn tr\xEAn Internet hi\u1EC7n nay bao g\u1ED3m nh\u1EEFng g\xEC?",
    "options": [
      {
        "id": "opt_t7_gk1_13_a",
        "text": "Ch\u1EC9 c\xF3 di\u1EC5n \u0111\xE0n th\u1EA3o lu\u1EADn.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_13_b",
        "text": "Ch\u1EC9 c\xF3 th\u01B0 \u0111i\u1EC7n t\u1EED (email).",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_13_c",
        "text": "Th\u01B0 \u0111i\u1EC7n t\u1EED, di\u1EC5n \u0111\xE0n (Forum), m\u1EA1ng x\xE3 h\u1ED9i.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_13_d",
        "text": "\u0110i\u1EC7n b\xE1o, b\u01B0u \u0111i\u1EC7n truy\u1EC1n th\u1ED1ng.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_4_mang_xa_hoi_va_internet"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_14",
    "type": "single_choice",
    "prompt": "M\u1EA1ng x\xE3 h\u1ED9i l\xE0 g\xEC?",
    "options": [
      {
        "id": "opt_t7_gk1_14_a",
        "text": "L\xE0 m\u1EA1ng k\u1EBFt n\u1ED1i c\xE1c m\xE1y t\xEDnh trong m\u1ED9t tr\u01B0\u1EDDng h\u1ECDc b\u1EB1ng d\xE2y c\xE1p.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_14_b",
        "text": "L\xE0 m\u1ED9t th\u01B0 vi\u1EC7n \u0111i\u1EC7n t\u1EED ch\u1EC9 ch\u1EE9a s\xE1ch k\u0129 thu\u1EADt s\u1ED1.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_14_c",
        "text": "L\xE0 ph\u1EA7n m\u1EC1m h\u1EC7 th\u1ED1ng gi\xFAp m\xE1y t\xEDnh ho\u1EA1t \u0111\u1ED9ng.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_14_d",
        "text": "L\xE0 m\u1ED9t c\u1ED9ng \u0111\u1ED3ng tr\u1EF1c tuy\u1EBFn \u0111\u1EC3 m\u1ECDi ng\u01B0\u1EDDi c\xF3 th\u1EC3 t\u01B0\u01A1ng t\xE1c, giao ti\u1EBFp v\u1EDBi nhau.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_4_mang_xa_hoi_va_internet"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_15",
    "type": "single_choice",
    "prompt": "M\u1EE5c \u0111\xEDch ch\xEDnh c\u1EE7a m\u1EA1ng x\xE3 h\u1ED9i Facebook ho\u1EB7c Zalo l\xE0 g\xEC?",
    "options": [
      {
        "id": "opt_t7_gk1_15_a",
        "text": "Chia s\u1EBB video k\u0129 thu\u1EADt cao l\xE0 ch\u1EE7 y\u1EBFu.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_15_b",
        "text": "Qu\u1EA3n l\xED t\u1EC7p tin trong m\xE1y t\xEDnh n\u1ED9i b\u1ED9.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_15_c",
        "text": "Giao l\u01B0u k\u1EBFt n\u1ED1i b\u1EA1n b\xE8, chia s\u1EBB h\xECnh \u1EA3nh, suy ngh\u0129 c\xE1 nh\xE2n.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_15_d",
        "text": "Th\u1EA3o lu\u1EADn c\xE1c b\xE0i to\xE1n gi\u1EA3i t\xEDch chuy\xEAn s\xE2u.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_4_mang_xa_hoi_va_internet"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_16",
    "type": "single_choice",
    "prompt": "M\u1EA1ng x\xE3 h\u1ED9i YouTube t\u1EADp trung ch\u1EE7 y\u1EBFu v\xE0o vi\u1EC7c chia s\u1EBB lo\u1EA1i d\u1EEF li\u1EC7u n\xE0o?",
    "options": [
      {
        "id": "opt_t7_gk1_16_a",
        "text": "T\u1EC7p th\u1EF1c thi ch\u01B0\u01A1ng tr\xECnh.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_16_b",
        "text": "Video.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_16_c",
        "text": "H\xECnh \u1EA3nh (\u1EA2nh ch\u1EE5p t\u0129nh).",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_16_d",
        "text": "V\u0103n b\u1EA3n Word.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_4_mang_xa_hoi_va_internet"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_17",
    "type": "single_choice",
    "prompt": "Thi\u1EBFt b\u1ECB n\xE0o v\u1EEBa l\xE0 thi\u1EBFt b\u1ECB v\xE0o v\u1EEBa l\xE0 thi\u1EBFt b\u1ECB ra?",
    "options": [
      {
        "id": "opt_t7_gk1_17_a",
        "text": "M\xE0n h\xECnh m\xE1y t\xEDnh th\xF4ng th\u01B0\u1EDDng.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_17_b",
        "text": "B\xE0n ph\xEDm.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_17_c",
        "text": "M\xE0n h\xECnh c\u1EA3m \u1EE9ng (touch screen).",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_17_d",
        "text": "Loa th\u01B0\u1EDDng.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_1_thiet_bi_vao_ra"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_18",
    "type": "single_choice",
    "prompt": "Thao t\xE1c n\xE0o sau \u0111\xE2y l\xE0 thao t\xE1c t\u1EAFt m\xE1y t\xEDnh an to\xE0n, \u0111\xFAng c\xE1ch?",
    "options": [
      {
        "id": "opt_t7_gk1_18_a",
        "text": "Nh\u1EA5n gi\u1EEF n\xFAt ngu\u1ED3n (Power) v\xE0i gi\xE2y.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_18_b",
        "text": "R\xFAt ph\xEDch c\u1EAFm \u0111i\u1EC7n \u0111\u1ED9t ng\u1ED9t.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_18_c",
        "text": "T\u1EAFt c\xF4ng t\u1EAFc m\xE0n h\xECnh r\u1ED3i r\xFAt \u0111i\u1EC7n.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_18_d",
        "text": "S\u1EED d\u1EE5ng n\xFAt l\u1EC7nh Shut down c\u1EE7a h\u1EC7 \u0111i\u1EC1u h\xE0nh.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_1_thiet_bi_vao_ra"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_19",
    "type": "single_choice",
    "prompt": "T\u1EA1i sao kh\xF4ng n\xEAn ch\u1EA1m v\xE0o ph\u1EA7n kim lo\u1EA1i c\u1EE7a m\xE1y t\xEDnh khi \u0111ang c\u1EAFm \u0111i\u1EC7n ho\u1EB7c lau d\u1ECDn ch\u01B0a r\xFAt \u0111i\u1EC7n?",
    "options": [
      {
        "id": "opt_t7_gk1_19_a",
        "text": "L\xE0m m\u1EA5t d\u1EEF li\u1EC7u trong m\xE1y.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_19_b",
        "text": "L\xE0m tr\u1EA7y x\u01B0\u1EDBc m\xE1y t\xEDnh.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_19_c",
        "text": "L\xE0m m\xE1y t\xEDnh ch\u1EA1y ch\u1EADm \u0111i.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_19_d",
        "text": "D\u1EC5 g\xE2y ra gi\u1EADt \u0111i\u1EC7n, kh\xF4ng an to\xE0n.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_1_thiet_bi_vao_ra"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_20",
    "type": "single_choice",
    "prompt": "M\u1ED1i quan h\u1EC7 gi\u1EEFa h\u1EC7 \u0111i\u1EC1u h\xE0nh v\xE0 ph\u1EA7n m\u1EC1m \u1EE9ng d\u1EE5ng l\xE0 g\xEC?",
    "options": [
      {
        "id": "opt_t7_gk1_20_a",
        "text": "Ph\u1EA7n m\u1EC1m \u1EE9ng d\u1EE5ng ch\u1EA1y trong m\xF4i tr\u01B0\u1EDDng do h\u1EC7 \u0111i\u1EC1u h\xE0nh t\u1EA1o ra.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_20_b",
        "text": "H\u1EC7 \u0111i\u1EC1u h\xE0nh ch\u1EA1y b\xEAn trong ph\u1EA7n m\u1EC1m \u1EE9ng d\u1EE5ng.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_20_c",
        "text": "C\u1EA3 hai ho\u1EA1t \u0111\u1ED9ng \u0111\u1ED9c l\u1EADp, kh\xF4ng li\xEAn quan \u0111\u1EBFn nhau.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_20_d",
        "text": "Ph\u1EA7n m\u1EC1m \u1EE9ng d\u1EE5ng c\xF3 ch\u1EE9c n\u0103ng \u0111i\u1EC1u khi\u1EC3n h\u1EC7 \u0111i\u1EC1u h\xE0nh.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_2_he_dieu_hanh_va_phan_mem"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_21",
    "type": "single_choice",
    "prompt": "T\u1EA1i sao n\xEAn ph\xE2n lo\u1EA1i d\u1EEF li\u1EC7u v\xE0 l\u01B0u tr\u1EEF theo tr\u1EADt t\u1EF1 th\u01B0 m\u1EE5c, \u0111\u1EB7t t\xEAn r\xF5 r\xE0ng?",
    "options": [
      {
        "id": "opt_t7_gk1_21_a",
        "text": "\u0110\u1EC3 m\xE1y t\xEDnh ch\u1EA1y nhanh h\u01A1n.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_21_b",
        "text": "\u0110\u1EC3 d\u1EC5 d\xE0ng, nhanh ch\xF3ng t\xECm ki\u1EBFm v\xE0 truy c\u1EADp l\u1EA1i khi c\u1EA7n.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_21_c",
        "text": "\u0110\u1EC3 ph\u1EA7n m\u1EC1m \u1EE9ng d\u1EE5ng ho\u1EA1t \u0111\u1ED9ng ch\xEDnh x\xE1c h\u01A1n.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_21_d",
        "text": "\u0110\u1EC3 m\xE1y t\xEDnh kh\xF4ng b\u1ECB nhi\u1EC5m virus.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_3_quan_li_du_lieu_tep_va_thu_muc"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_22",
    "type": "single_choice",
    "prompt": "Sao l\u01B0u d\u1EEF li\u1EC7u l\xE0 thao t\xE1c n\xE0o sau \u0111\xE2y?",
    "options": [
      {
        "id": "opt_t7_gk1_22_a",
        "text": "Xo\xE1 d\u1EEF li\u1EC7u g\u1ED1c v\xE0 ch\u1EC9 gi\u1EEF l\u1EA1i m\u1ED9t phi\xEAn b\u1EA3n duy nh\u1EA5t.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_22_b",
        "text": "T\u1EA1o ra b\u1EA3n sao c\xE1c t\u1EC7p/th\u01B0 m\u1EE5c v\xE0 l\u01B0u ch\xFAng l\xEAn m\u1ED9t thi\u1EBFt b\u1ECB l\u01B0u tr\u1EEF kh\xE1c.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_22_c",
        "text": "\u0110\u1ED5i t\xEAn to\xE0n b\u1ED9 th\u01B0 m\u1EE5c trong m\xE1y t\xEDnh.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_22_d",
        "text": "\u0110\u0103ng t\u1EA3i d\u1EEF li\u1EC7u l\xEAn m\u1EA1ng \u0111\u1EC3 m\u1ECDi ng\u01B0\u1EDDi c\xF9ng xem.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_3_quan_li_du_lieu_tep_va_thu_muc"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_23",
    "type": "single_choice",
    "prompt": "Nh\u01B0\u1EE3c \u0111i\u1EC3m c\u1EE7a sao l\u01B0u c\u1EE5c b\u1ED9 (l\u01B0u tr\xEAn \u1ED5 c\u1EE9ng ngo\xE0i, USB \u0111\u1EC3 c\xF9ng ch\u1ED7 v\u1EDBi m\xE1y t\xEDnh) l\xE0 g\xEC?",
    "options": [
      {
        "id": "opt_t7_gk1_23_a",
        "text": "Kh\xF4i ph\u1EE5c d\u1EEF li\u1EC7u r\u1EA5t ch\u1EADm.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_23_b",
        "text": "Chi ph\xED r\u1EA5t cao.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_23_c",
        "text": "N\u1EBFu r\u1EE7i ro l\xE0m m\u1EA5t c\u1EA3 m\xE1y t\xEDnh l\u1EABn USB (v\xED d\u1EE5 h\u1ECFa ho\u1EA1n, m\u1EA5t c\u1EAFp) th\xEC b\u1EA3n sao c\u0169ng b\u1ECB m\u1EA5t theo.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_23_d",
        "text": "Kh\xF4ng th\u1EC3 l\u01B0u \u0111\u01B0\u1EE3c c\xE1c t\u1EC7p dung l\u01B0\u1EE3ng l\u1EDBn.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_3_quan_li_du_lieu_tep_va_thu_muc"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_24",
    "type": "single_choice",
    "prompt": "L\u1EC7nh n\xE0o d\xF9ng \u0111\u1EC3 \u0111\u1ED5i t\xEAn m\u1ED9t th\u01B0 m\u1EE5c ho\u1EB7c t\u1EC7p \u0111\xE3 ch\u1ECDn?",
    "options": [
      {
        "id": "opt_t7_gk1_24_a",
        "text": "Paste.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_24_b",
        "text": "Delete.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_24_c",
        "text": "Rename.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_24_d",
        "text": "Copy.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_3_quan_li_du_lieu_tep_va_thu_muc"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_25",
    "type": "single_choice",
    "prompt": "Thao t\xE1c s\u1EED d\u1EE5ng c\u1EB7p l\u1EC7nh 'Copy' v\xE0 'Paste' \u0111\u1ED1i v\u1EDBi m\u1ED9t t\u1EC7p s\u1EBD d\u1EABn \u0111\u1EBFn k\u1EBFt qu\u1EA3 g\xEC?",
    "options": [
      {
        "id": "opt_t7_gk1_25_a",
        "text": "T\u1EC7p g\u1ED1c b\u1ECB \u0111\u1ED5i t\xEAn.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_25_b",
        "text": "T\u1EC7p g\u1ED1c b\u1ECB di chuy\u1EC3n sang v\u1ECB tr\xED m\u1EDBi.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_25_c",
        "text": "T\u1EC7p g\u1ED1c b\u1ECB xo\xE1 \u0111i.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_25_d",
        "text": "T\u1EA1o ra m\u1ED9t b\u1EA3n sao c\u1EE7a t\u1EC7p t\u1EA1i v\u1ECB tr\xED m\u1EDBi, t\u1EC7p g\u1ED1c v\u1EABn gi\u1EEF nguy\xEAn.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_3_quan_li_du_lieu_tep_va_thu_muc"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_26",
    "type": "single_choice",
    "prompt": "T\xEDnh n\u0103ng n\xE0o sau \u0111\xE2y KH\xD4NG ph\u1EA3i l\xE0 ch\u1EE9c n\u0103ng ph\u1ED5 bi\u1EBFn c\u1EE7a m\u1EA1ng x\xE3 h\u1ED9i?",
    "options": [
      {
        "id": "opt_t7_gk1_26_a",
        "text": "Vi\u1EBFt ch\u01B0\u01A1ng tr\xECnh \u0111i\u1EC1u khi\u1EC3n ph\u1EA7n c\u1EE9ng m\xE1y t\xEDnh.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_26_b",
        "text": "G\u1EEDi tin nh\u1EAFn ri\xEAng t\u01B0.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_26_c",
        "text": "B\xECnh lu\u1EADn (comment) tr\xEAn b\xE0i \u0111\u0103ng c\u1EE7a b\u1EA1n b\xE8.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_26_d",
        "text": "\u0110\u0103ng \u1EA3nh, video.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_4_mang_xa_hoi_va_internet"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_27",
    "type": "single_choice",
    "prompt": "N\u1EBFu em b\u1EAFt g\u1EB7p m\u1ED9t th\xF4ng tin 's\u1ED1c' tr\xEAn m\u1EA1ng nh\u01B0ng ch\u01B0a \u0111\u01B0\u1EE3c ki\u1EC3m ch\u1EE9ng, vi\u1EC7c l\xE0m \u0110\xDANG \u0111\u1EAFn l\xE0 g\xEC?",
    "options": [
      {
        "id": "opt_t7_gk1_27_a",
        "text": "Sao ch\xE9p v\xE0 \u0111\u0103ng l\u1EA1i tr\xEAn trang c\xE1 nh\xE2n c\u1EE7a m\xECnh xem nh\u01B0 l\xE0 th\xF4ng tin c\u1EE7a m\xECnh.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_27_b",
        "text": "L\u1EADp t\u1EE9c chia s\u1EBB ngay \u0111\u1EC3 c\u1EA3nh b\xE1o m\u1ECDi ng\u01B0\u1EDDi.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_27_c",
        "text": "Th\xEAm b\xECnh lu\u1EADn k\xEDch \u0111\u1ED9ng v\xE0o b\xE0i vi\u1EBFt.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_27_d",
        "text": "Kh\xF4ng chia s\u1EBB v\u1ED9i, t\xECm hi\u1EC3u k\u0129 t\xEDnh x\xE1c th\u1EF1c c\u1EE7a th\xF4ng tin t\u1EEB c\xE1c ngu\u1ED3n ch\xEDnh th\u1ED1ng.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_4_mang_xa_hoi_va_internet"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_28",
    "type": "single_choice",
    "prompt": "Thao t\xE1c n\xE0o d\xF9ng \u0111\u1EC3 di chuy\u1EC3n m\u1ED9t th\u01B0 m\u1EE5c/t\u1EC7p (c\u1EAFt t\u1EEB ch\u1ED7 c\u0169 sang ch\u1ED7 m\u1EDBi)?",
    "options": [
      {
        "id": "opt_t7_gk1_28_a",
        "text": "Cut v\xE0 Paste.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_28_b",
        "text": "Delete v\xE0 Paste.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_28_c",
        "text": "Copy v\xE0 Paste.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_28_d",
        "text": "Rename v\xE0 Cut.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_3_quan_li_du_lieu_tep_va_thu_muc"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_29",
    "type": "single_choice",
    "prompt": "N\u1EBFu em nh\xECn th\u1EA5y m\u1ED9t t\u1EC7p c\xF3 \u0111u\xF4i '.exe' trong \u1ED5 \u0111\u0129a h\u1EC7 th\u1ED1ng v\xE0 kh\xF4ng bi\u1EBFt r\xF5 v\u1EC1 n\xF3, em N\xCAN l\xE0m g\xEC?",
    "options": [
      {
        "id": "opt_t7_gk1_29_a",
        "text": "L\u1EADp t\u1EE9c xo\xE1 n\xF3 \u0111\u1EC3 gi\u1EA3i ph\xF3ng b\u1ED9 nh\u1EDB.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_29_b",
        "text": "\u0110\u1ED5i \u0111u\xF4i t\u1EC7p th\xE0nh '.txt' \u0111\u1EC3 d\u1EC5 \u0111\u1ECDc.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_29_c",
        "text": "Kh\xF4ng n\xEAn xo\xE1 hay di chuy\u1EC3n v\xEC \u0111\xF3 c\xF3 th\u1EC3 l\xE0 t\u1EC7p h\u1EC7 th\u1ED1ng/ch\u01B0\u01A1ng tr\xECnh c\u1EA7n thi\u1EBFt.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_29_d",
        "text": "T\u1EA3i l\xEAn m\u1EA1ng x\xE3 h\u1ED9i chia s\u1EBB cho b\u1EA1n b\xE8.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_3_quan_li_du_lieu_tep_va_thu_muc"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_30",
    "type": "single_choice",
    "prompt": "Khi s\u1EED d\u1EE5ng m\u1EA1ng x\xE3 h\u1ED9i, \u0111\u1EC3 \u0111\u1EA3m b\u1EA3o an to\xE0n th\xF4ng tin c\xE1 nh\xE2n, em N\xCAN l\xE0m g\xEC?",
    "options": [
      {
        "id": "opt_t7_gk1_30_a",
        "text": "\u0110\u1EC3 ch\u1EBF \u0111\u1ED9 c\xF4ng khai (Public) to\xE0n b\u1ED9 th\xF4ng tin c\xE1 nh\xE2n.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_30_b",
        "text": "Ch\u1EC9 k\u1EBFt b\u1EA1n v\xE0 tr\xF2 chuy\u1EC7n v\u1EDBi ng\u01B0\u1EDDi m\xE0 em th\u1EF1c s\u1EF1 quen bi\u1EBFt v\xE0 tin t\u01B0\u1EDFng.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_30_c",
        "text": "\u0110\u0103ng t\u1EA3i chi ti\u1EBFt m\u1ECDi l\u1ECBch tr\xECnh di chuy\u1EC3n h\xE0ng ng\xE0y c\u1EE7a b\u1EA3n th\xE2n l\xEAn m\u1EA1ng.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_30_d",
        "text": "C\xF4ng khai m\u1EADt kh\u1EA9u \u0111\u1EC3 b\u1EA1n b\xE8 c\xF9ng s\u1EED d\u1EE5ng chung.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_4_mang_xa_hoi_va_internet"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_31",
    "type": "single_choice",
    "prompt": "B\u1EA1n An c\u1EAFm USB v\xE0o m\xE1y t\xEDnh \u0111\u1EC3 copy b\xE0i nh\u01B0ng kh\xF4ng th\u1EA5y hi\u1EC7n l\xEAn, b\u1EF1c m\xECnh An li\u1EC1n r\xFAt USB ra ngay l\u1EADp t\u1EE9c m\xE0 kh\xF4ng s\u1EED d\u1EE5ng ch\u1EE9c n\u0103ng Eject (Ng\u1EAFt k\u1EBFt n\u1ED1i an to\xE0n). Vi\u1EC7c l\xE0m n\xE0y c\xF3 nguy c\u01A1 g\xEC l\u1EDBn nh\u1EA5t?",
    "options": [
      {
        "id": "opt_t7_gk1_31_a",
        "text": "L\xE0m l\u1ED7i c\u1EA5u tr\xFAc, g\xE2y m\u1EA5t m\xE1t ho\u1EB7c h\u1ECFng d\u1EEF li\u1EC7u trong USB.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_31_b",
        "text": "L\xE0m m\xE1y t\xEDnh b\u1ECB t\u1EAFt ngu\u1ED3n \u0111\u1ED9t ng\u1ED9t.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_31_c",
        "text": "L\xE0m h\u1ECFng v\u0129nh vi\u1EC5n c\xE1c c\u1ED5ng c\u1EAFm USB c\u1EE7a m\xE1y t\xEDnh.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_31_d",
        "text": "T\u1EF1 \u0111\u1ED9ng chia s\u1EBB d\u1EEF li\u1EC7u USB l\xEAn m\u1EA1ng Internet.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_3_quan_li_du_lieu_tep_va_thu_muc"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_32",
    "type": "single_choice",
    "prompt": "Nh\xF3m c\u1EE7a em \u0111ang l\xE0m m\u1ED9t d\u1EF1 \xE1n v\xE0 mu\u1ED1n t\u1EA1o m\u1ED9t th\u01B0 m\u1EE5c l\u01B0u tr\u1EEF t\xE0i li\u1EC7u chung \u0111\u1EC3 t\u1EA5t c\u1EA3 th\xE0nh vi\xEAn c\xF3 th\u1EC3 truy c\u1EADp, xem v\xE0 ch\u1EC9nh s\u1EEDa t\u1EEB xa m\u1ECDi l\xFAc m\u1ECDi n\u01A1i. Bi\u1EC7n ph\xE1p l\u01B0u tr\u1EEF n\xE0o l\xE0 T\u1ED0T NH\u1EA4T?",
    "options": [
      {
        "id": "opt_t7_gk1_32_a",
        "text": "L\u01B0u \u1EDF \u1ED5 \u0111\u0129a C c\u1EE7a tr\u01B0\u1EDFng nh\xF3m.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_32_b",
        "text": "Ghi ra \u0111\u0129a CD r\u1ED3i ph\xE1t cho t\u1EEBng ng\u01B0\u1EDDi trong nh\xF3m.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_32_c",
        "text": "L\u01B0u v\xE0o m\u1ED9t chi\u1EBFc USB v\xE0 chuy\u1EC1n tay nhau lu\xE2n phi\xEAn m\u01B0\u1EE3n.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_32_d",
        "text": "L\u01B0u tr\xEAn c\xE1c d\u1ECBch v\u1EE5 l\u01B0u tr\u1EEF \u0111\xE1m m\xE2y nh\u01B0 Google Drive, OneDrive.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_3_quan_li_du_lieu_tep_va_thu_muc"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_tf_1",
    "type": "true_false",
    "prompt": "\u0110\u1ECDc c\xE1c ph\xE1t bi\u1EC3u sau v\u1EC1 quy t\u1EAFc tham gia m\u1EA1ng x\xE3 h\u1ED9i v\xE0 s\u1EED d\u1EE5ng Internet an to\xE0n:",
    "items": [
      {
        "id": "sub_t7_gk1_1_a",
        "text": "Vi\u1EC7c \u0111\u0103ng t\u1EA3i, chia s\u1EBB c\xE1c th\xF4ng tin gi\u1EA3 m\u1EA1o, sai s\u1EF1 th\u1EADt tr\xEAn m\u1EA1ng x\xE3 h\u1ED9i l\xE0 h\xE0nh vi b\u1ECB ph\xE1p lu\u1EADt nghi\xEAm c\u1EA5m.",
        "is_correct": true
      },
      {
        "id": "sub_t7_gk1_1_b",
        "text": "B\u1EA5t k\xEC ai, \u1EDF m\u1ECDi l\u1EE9a tu\u1ED5i k\u1EC3 c\u1EA3 d\u01B0\u1EDBi 10 tu\u1ED5i \u0111\u1EC1u \u0111\u01B0\u1EE3c ph\xE9p t\u1EF1 do l\u1EADp t\xE0i kho\u1EA3n Facebook m\xE0 kh\xF4ng c\xF3 gi\u1EDBi h\u1EA1n n\xE0o.",
        "is_correct": false
      },
      {
        "id": "sub_t7_gk1_1_c",
        "text": "Khi nh\u1EADn \u0111\u01B0\u1EE3c m\u1ED9t y\xEAu c\u1EA7u k\u1EBFt b\u1EA1n t\u1EEB m\u1ED9t t\xE0i kho\u1EA3n ho\xE0n to\xE0n xa l\u1EA1, em n\xEAn ch\u1EA5p nh\u1EADn ngay \u0111\u1EC3 m\u1EDF r\u1ED9ng giao ti\u1EBFp.",
        "is_correct": false
      },
      {
        "id": "sub_t7_gk1_1_d",
        "text": "M\u1EA1ng x\xE3 h\u1ED9i l\xE0 con dao hai l\u01B0\u1EE1i (c\xF3 c\u1EA3 m\u1EB7t t\u1ED1t v\xE0 m\u1EB7t x\u1EA5u), h\u1ECDc sinh c\u1EA7n t\xECm hi\u1EC3u k\u0129 v\xE0 s\u1EED d\u1EE5ng \u0111\xFAng m\u1EE5c \u0111\xEDch h\u1ECDc t\u1EADp, giao l\u01B0u l\xE0nh m\u1EA1nh.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "dung_sai_chum",
      "bai_4_mang_xa_hoi_va_internet"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  },
  {
    "id": "q_tin7_gk1_tf_2",
    "type": "true_false",
    "prompt": "\u0110\u1ECDc t\xECnh hu\u1ED1ng sau: \u201CB\u1EA1n Khoa mang m\xE1y t\xEDnh x\xE1ch tay ra qu\xE1n c\xE0 ph\xEA \u0111\u1EC3 ho\xE0n th\xE0nh d\u1EF1 \xE1n Tin h\u1ECDc. Trong l\xFAc l\xE0m vi\u1EC7c, Khoa th\u1EA5y m\u1ED9t chi\u1EBFc USB l\u1EA1 ai \u0111\xF3 b\u1ECF qu\xEAn tr\xEAn b\xE0n li\u1EC1n c\u1EAFm v\xE0o m\xE1y \u0111\u1EC3 xem th\u1EED n\u1ED9i dung, \u0111\u1ED3ng th\u1EDDi Khoa k\u1EBFt n\u1ED1i v\xE0o wifi c\xF4ng c\u1ED9ng kh\xF4ng m\u1EADt kh\u1EA9u \u0111\u1EC3 \u0111\u0103ng nh\u1EADp t\xE0i kho\u1EA3n c\xE1 nh\xE2n t\u1EA3i t\xE0i li\u1EC7u. Do v\u1ED9i v\xE3 l\u1EA5y \u0111\u1ED3, Khoa v\xF4 t\xECnh l\xE0m \u0111\u1ED5 m\u1ED9t ch\xFAt n\u01B0\u1EDBc ra c\u1EA1nh m\xE1y t\xEDnh.\u201D \u0110\xE1nh gi\xE1 c\xE1c h\xE0nh vi c\u1EE7a Khoa:",
    "items": [
      {
        "id": "sub_t7_gk1_2_a",
        "text": "Vi\u1EC7c c\u1EAFm chi\u1EBFc USB l\u1EA1 nh\u1EB7t \u0111\u01B0\u1EE3c v\xE0o m\xE1y t\xEDnh l\xE0 ho\xE0n to\xE0n an to\xE0n n\u1EBFu Khoa ch\u01B0a nh\xE1y \u0111\xFAp m\u1EDF c\xE1c t\u1EC7p tin b\xEAn trong.",
        "is_correct": false
      },
      {
        "id": "sub_t7_gk1_2_b",
        "text": "\u0110\u0103ng nh\u1EADp t\xE0i kho\u1EA3n c\xE1 nh\xE2n, m\u1EADt kh\u1EA9u qua m\u1EA1ng wifi c\xF4ng c\u1ED9ng kh\xF4ng c\xF3 m\xE3 h\xF3a (kh\xF4ng m\u1EADt kh\u1EA9u) c\xF3 r\u1EE7i ro b\u1ECB tin t\u1EB7c \u0111\xE1nh c\u1EAFp th\xF4ng tin.",
        "is_correct": true
      },
      {
        "id": "sub_t7_gk1_2_c",
        "text": "Khoa c\u1EA7n lau tay kh\xF4, nhanh ch\xF3ng th\u1EA5m v\xF9ng n\u01B0\u1EDBc b\u1ECB \u0111\u1ED5 v\xE0 c\xE1ch li ngu\u1ED3n n\u01B0\u1EDBc \u0111\u1EC3 tr\xE1nh n\u01B0\u1EDBc ng\u1EA5m v\xE0o khe t\u1EA3n nhi\u1EC7t hay c\u1ED5ng c\u1EAFm g\xE2y ch\u1EADp ch\xE1y.",
        "is_correct": true
      },
      {
        "id": "sub_t7_gk1_2_d",
        "text": "\u0110\u1EC3 b\xE0i t\u1EADp d\u1EF1 \xE1n \u0111\u01B0\u1EE3c an to\xE0n tuy\u1EC7t \u0111\u1ED1i, Khoa ch\u1EC9 c\u1EA7n l\xE0m xong v\xE0 l\u01B0u n\xF3 duy nh\u1EA5t tr\xEAn m\xE0n h\xECnh Desktop c\u1EE7a m\xE1y t\xEDnh x\xE1ch tay \u0111\xF3.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "dung_sai_chum",
      "an_toan_may_tinh_va_du_lieu"
    ],
    "grade": "L\u1EDBp 7",
    "subject": "Tin h\u1ECDc",
    "term": "Gi\u1EEFa k\xEC I"
  }
];
var DEFAULT_EXAM_CONFIG = {
  exam_id: "exam_tin7_giuaki1",
  title: "\u0110\u1EC1 C\u01B0\u01A1ng \xD4n T\u1EADp Gi\u1EEFa H\u1ECDc K\xEC I - M\xF4n Tin H\u1ECDc 7",
  duration_minutes: 45,
  max_violations_allowed: 3,
  total_questions_to_pick: 20,
  distribution: {
    single_choice: 16,
    true_false: 4
  },
  access_pin: "",
  teacher_password: "admin2026",
  variants_count: 12,
  base_code: 101,
  session_salt: 2026
};

// src/data/defaultClasses.ts
var DEFAULT_CLASSES = [
  {
    id: "cls_6ontap",
    code: "6ONTAP",
    name: "L\u1EDBp 6 - \xD4n T\u1EADp Th\u01B0\u1EDDng Xuy\xEAn (Test)",
    grade: "L\u1EDBp 6",
    subject: "Tin h\u1ECDc",
    teacherName: "Th\u1EA7y/C\xF4 B\u1ED9 M\xF4n Tin H\u1ECDc",
    pinCode: "6666",
    examTitle: "\u0110\u1EC1 \xD4n T\u1EADp Th\u01B0\u1EDDng Xuy\xEAn - Tin H\u1ECDc 6",
    examConfig: {
      duration_minutes: 45,
      total_questions_to_pick: 20,
      target_grade: "L\u1EDBp 6",
      target_subject: "Tin h\u1ECDc",
      target_term: "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn",
      exam_mode: "bank",
      distribution: {
        single_choice: 16,
        true_false: 4
      }
    },
    isActive: true,
    description: "\u0110\u1EC1 \xF4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn Tin h\u1ECDc 6 (Ng\xE2n h\xE0ng 50 c\xE2u: 44 tr\u1EAFc nghi\u1EC7m \u0111\u01A1n + 6 tr\u1EAFc nghi\u1EC7m \u0111\xFAng/sai)"
  },
  {
    id: "cls_6g01",
    code: "6G01",
    name: "L\u1EDBp 6G01 - Tin H\u1ECDc 6",
    grade: "L\u1EDBp 6",
    subject: "Tin h\u1ECDc",
    teacherName: "Th\u1EA7y/C\xF4 B\u1ED9 M\xF4n Tin H\u1ECDc",
    pinCode: "6001",
    examTitle: "\u0110\u1EC1 \xD4n T\u1EADp Th\u01B0\u1EDDng Xuy\xEAn - Tin H\u1ECDc 6 (L\u1EDBp 6G01)",
    examConfig: {
      duration_minutes: 45,
      total_questions_to_pick: 20,
      target_grade: "L\u1EDBp 6",
      target_subject: "Tin h\u1ECDc",
      target_term: "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn",
      exam_mode: "bank",
      distribution: {
        single_choice: 16,
        true_false: 4
      }
    },
    isActive: true,
    description: "\u0110\u1EC1 thi \xF4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn Tin h\u1ECDc 6 (16 tr\u1EAFc nghi\u1EC7m + 4 \u0111\xFAng/sai)"
  },
  {
    id: "cls_7a1",
    code: "7A1",
    name: "L\u1EDBp 7A1 - Tin H\u1ECDc 7",
    grade: "L\u1EDBp 7",
    subject: "Tin h\u1ECDc",
    teacherName: "Th\u1EA7y/C\xF4 B\u1ED9 M\xF4n Tin H\u1ECDc",
    pinCode: "2026",
    examTitle: "Ki\u1EC3m Tra Tin H\u1ECDc 7 - H\u1ECDc K\xEC II (L\u1EDBp 7A1)",
    examConfig: {
      duration_minutes: 15,
      total_questions_to_pick: 10,
      target_grade: "L\u1EDBp 7",
      target_subject: "Tin h\u1ECDc",
      exam_mode: "bank",
      distribution: {
        single_choice: 8,
        true_false: 2
      }
    },
    isActive: true,
    description: "B\xE0i thi tr\u1EAFc nghi\u1EC7m kh\xE1ch quan ng\u1EABu nhi\xEAn h\xF3a \u0111\u1EC1 cho l\u1EDBp 7A1"
  },
  {
    id: "cls_7a2",
    code: "7A2",
    name: "L\u1EDBp 7A2 - Tin H\u1ECDc 7",
    grade: "L\u1EDBp 7",
    subject: "Tin h\u1ECDc",
    teacherName: "Th\u1EA7y/C\xF4 B\u1ED9 M\xF4n Tin H\u1ECDc",
    pinCode: "7226",
    examTitle: "Ki\u1EC3m Tra Tin H\u1ECDc 7 - \u0110\u1EC1 S\u1ED1 2 (L\u1EDBp 7A2)",
    examConfig: {
      duration_minutes: 15,
      total_questions_to_pick: 10,
      target_grade: "L\u1EDBp 7",
      target_subject: "Tin h\u1ECDc",
      exam_mode: "bank",
      distribution: {
        single_choice: 8,
        true_false: 2
      }
    },
    isActive: true,
    description: "B\xE0i thi tr\u1EAFc nghi\u1EC7m ri\xEAng bi\u1EC7t cho h\u1ECDc sinh l\u1EDBp 7A2"
  },
  {
    id: "cls_7c",
    code: "7C",
    name: "L\u1EDBp 7C - Tin H\u1ECDc 7",
    grade: "L\u1EDBp 7",
    subject: "Tin h\u1ECDc",
    teacherName: "Th\u1EA7y/C\xF4 B\u1ED9 M\xF4n Tin H\u1ECDc",
    pinCode: "7007",
    examTitle: "\u0110\u1EC1 Thi Gi\u1EEFa H\u1ECDc K\xEC 1 - Tin H\u1ECDc 7 (L\u1EDBp 7C)",
    examConfig: {
      duration_minutes: 45,
      total_questions_to_pick: 34,
      target_grade: "L\u1EDBp 7",
      target_subject: "Tin h\u1ECDc",
      target_term: "Gi\u1EEFa k\xEC I",
      exam_mode: "bank",
      distribution: {
        single_choice: 32,
        true_false: 2,
        single_choice_points: 8,
        true_false_points: 2
      }
    },
    isActive: true,
    description: "\u0110\u1EC1 thi Gi\u1EEFa h\u1ECDc k\xEC 1 m\xF4n Tin h\u1ECDc 7 ch\xEDnh th\u1EE9c (32 c\xE2u tr\u1EAFc nghi\u1EC7m 8.0\u0111 + 2 c\xE2u \u0111\xFAng/sai 2.0\u0111, Th\u1EDDi gian 45 ph\xFAt)"
  },
  {
    id: "cls_10a1",
    code: "10A1",
    name: "L\u1EDBp 10A1 - To\xE1n H\u1ECDc 10",
    grade: "L\u1EDBp 10",
    subject: "To\xE1n h\u1ECDc",
    teacherName: "Th\u1EA7y/C\xF4 B\u1ED9 M\xF4n To\xE1n H\u1ECDc",
    pinCode: "1010",
    examTitle: "Ki\u1EC3m Tra \u0110\u1EA1i S\u1ED1 & H\xECnh H\u1ECDc 10 (L\u1EDBp 10A1)",
    examConfig: {
      duration_minutes: 45,
      total_questions_to_pick: 20,
      target_grade: "L\u1EDBp 10",
      target_subject: "To\xE1n h\u1ECDc",
      exam_mode: "bank",
      distribution: {
        single_choice: 16,
        true_false: 4
      }
    },
    isActive: true,
    description: "Ph\xF2ng thi To\xE1n l\u1EDBp 10A1 c\xF3 c\xF4ng th\u1EE9c LaTeX"
  },
  {
    id: "cls_12a3",
    code: "12A3",
    name: "L\u1EDBp 12A3 - V\u1EADt L\xED 12",
    grade: "L\u1EDBp 12",
    subject: "V\u1EADt l\xED",
    teacherName: "Th\u1EA7y/C\xF4 B\u1ED9 M\xF4n V\u1EADt L\xED",
    pinCode: "1234",
    examTitle: "Ki\u1EC3m Tra Chuy\xEAn \u0110\u1EC1 S\xF3ng \xC1nh S\xE1ng (L\u1EDBp 12A3)",
    examConfig: {
      duration_minutes: 45,
      total_questions_to_pick: 25,
      target_grade: "L\u1EDBp 12",
      target_subject: "V\u1EADt l\xED",
      exam_mode: "bank",
      distribution: {
        single_choice: 20,
        true_false: 5
      }
    },
    isActive: true,
    description: "Ph\xF2ng thi V\u1EADt l\xED 12A3 ch\u1ED1ng gian l\u1EADn \u0111a l\u1EDBp"
  }
];

// api_src/_storage.ts
var redisInstance = null;
var redisInitialized = false;
var memoryBank = DEFAULT_QUESTION_BANK;
var memoryConfig = DEFAULT_EXAM_CONFIG;
var memoryClasses = DEFAULT_CLASSES;
function getRedis() {
  if (redisInitialized) return redisInstance;
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_KV_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_KV_TOKEN;
  if (url && token) {
    try {
      redisInstance = new Redis({ url, token });
      console.log("\u2705 Connected to Upstash Redis Cloud Storage");
    } catch (err) {
      console.error("\u274C Failed to initialize Upstash Redis:", err);
      redisInstance = null;
    }
  } else {
    console.warn("\u26A0\uFE0F No Upstash Redis env detected (UPSTASH_REDIS_REST_URL / KV_REST_API_URL). Using in-memory fallback.");
    redisInstance = null;
  }
  redisInitialized = true;
  return redisInstance;
}
function handleCors(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if ((req.method || "").toUpperCase() === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return true;
  }
  return false;
}
async function parseJsonBody(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  if (req.readableEnded) {
    return {};
  }
  return new Promise((resolve) => {
    let raw = "";
    const timer = setTimeout(() => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    }, 1500);
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      clearTimeout(timer);
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
    req.on("error", () => {
      clearTimeout(timer);
      resolve({});
    });
  });
}
function sendJson(res, status, data) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.end(JSON.stringify(data));
}
async function getQuestionBank() {
  const redis = getRedis();
  if (redis) {
    try {
      let bank = await redis.get("exam:bank");
      if (typeof bank === "string") {
        try {
          bank = JSON.parse(bank);
        } catch {
        }
      }
      if (Array.isArray(bank) && bank.length > 0) {
        const existingIds = new Set(bank.map((q) => q.id));
        const missing = DEFAULT_QUESTION_BANK.filter((q) => !existingIds.has(q.id));
        if (missing.length > 0) {
          const merged = [...bank, ...missing];
          await redis.set("exam:bank", merged);
          return merged;
        }
        return bank;
      }
    } catch (err) {
      console.error("Error reading bank from Redis:", err);
    }
  }
  return memoryBank.length > 0 ? memoryBank : DEFAULT_QUESTION_BANK;
}
async function getExamConfig() {
  const redis = getRedis();
  if (redis) {
    try {
      let config = await redis.get("exam:config");
      if (typeof config === "string") {
        try {
          config = JSON.parse(config);
        } catch {
        }
      }
      if (config && config.title) return config;
    } catch (err) {
      console.error("Error reading config from Redis:", err);
    }
  }
  return memoryConfig;
}
async function getClasses() {
  const redis = getRedis();
  if (redis) {
    try {
      let classes = await redis.get("exam:classes");
      if (typeof classes === "string") {
        try {
          classes = JSON.parse(classes);
        } catch {
        }
      }
      if (Array.isArray(classes) && classes.length > 0) {
        const map = /* @__PURE__ */ new Map();
        classes.forEach((c) => map.set(c.code.trim().toUpperCase(), c));
        let changed = false;
        for (const def of DEFAULT_CLASSES) {
          const code = def.code.trim().toUpperCase();
          if (!map.has(code)) {
            map.set(code, def);
            changed = true;
          } else if (def.code === "7C") {
            const cur = map.get(code);
            if (cur.examConfig?.total_questions_to_pick !== 34 || cur.examTitle !== def.examTitle) {
              map.set(code, { ...cur, ...def });
              changed = true;
            }
          }
        }
        const merged = Array.from(map.values());
        if (changed) {
          await redis.set("exam:classes", merged);
        }
        return merged;
      }
    } catch (err) {
      console.error("Error reading classes from Redis:", err);
    }
  }
  return memoryClasses.length > 0 ? memoryClasses : DEFAULT_CLASSES;
}
var memorySessions = /* @__PURE__ */ new Map();
function getSessionKey(studentClass, studentName) {
  return `exam:session:${studentClass.trim().toUpperCase()}:${studentName.trim().toUpperCase()}`;
}
async function getActiveStudentSession(studentClass, studentName) {
  const key = getSessionKey(studentClass, studentName);
  const redis = getRedis();
  if (redis) {
    try {
      const session = await redis.get(key);
      if (session && session.attemptId) return session;
    } catch (err) {
      console.error("Error reading active session from Redis:", err);
    }
  }
  return memorySessions.get(key) || null;
}
async function saveActiveStudentSession(session) {
  const key = getSessionKey(session.studentClass, session.studentName);
  const redis = getRedis();
  const ttl = Math.max(300, (session.durationSeconds || 900) + 600);
  if (redis) {
    try {
      await redis.set(key, session, { ex: ttl });
    } catch (err) {
      console.error("Error saving active session to Redis:", err);
    }
  }
  memorySessions.set(key, session);
}

// src/utils/questionClassification.ts
function getQuestionClassification(q) {
  let grade = q.grade;
  let subject = q.subject;
  let term = q.term;
  const combined = `${q.tags?.join(" ") || ""} ${q.id} ${q.prompt}`.toLowerCase();
  if (!grade) {
    if (combined.includes("tin_hoc_7") || combined.includes("lop 7") || combined.includes("l\u1EDBp 7") || combined.includes("toan 7") || combined.includes("to\xE1n 7") || combined.includes("tin 7") || combined.includes("tin7")) {
      grade = "L\u1EDBp 7";
    } else if (combined.includes("lop 6") || combined.includes("l\u1EDBp 6") || combined.includes("tin 6") || combined.includes("toan 6")) {
      grade = "L\u1EDBp 6";
    } else if (combined.includes("lop 8") || combined.includes("l\u1EDBp 8") || combined.includes("tin 8") || combined.includes("toan 8")) {
      grade = "L\u1EDBp 8";
    } else if (combined.includes("lop 9") || combined.includes("l\u1EDBp 9") || combined.includes("tin 9") || combined.includes("toan 9")) {
      grade = "L\u1EDBp 9";
    } else if (combined.includes("lop 10") || combined.includes("l\u1EDBp 10") || combined.includes("tin 10") || combined.includes("toan 10") || combined.includes("to\xE1n 10")) {
      grade = "L\u1EDBp 10";
    } else if (combined.includes("lop 11") || combined.includes("l\u1EDBp 11") || combined.includes("tin 11") || combined.includes("toan 11")) {
      grade = "L\u1EDBp 11";
    } else if (combined.includes("lop 12") || combined.includes("l\u1EDBp 12") || combined.includes("tin 12") || combined.includes("toan 12")) {
      grade = "L\u1EDBp 12";
    } else {
      grade = "L\u1EDBp 7";
    }
  }
  if (!subject) {
    if (combined.includes("toan") || combined.includes("to\xE1n") || combined.includes("\u0111\u1EA1i s\u1ED1") || combined.includes("h\xECnh h\u1ECDc") || combined.includes("tam gi\xE1c") || combined.includes("vecto") || combined.includes("h\xE0m s\u1ED1")) {
      subject = "To\xE1n h\u1ECDc";
    } else if (combined.includes("v\u1EADt l\xED") || combined.includes("vat li") || combined.includes("v\u1EADt l\xFD") || combined.includes("vat ly") || combined.includes("d\xF2ng \u0111i\u1EC7n") || combined.includes("v\u1EADn t\u1ED1c") || combined.includes("quang h\u1ECDc")) {
      subject = "V\u1EADt l\xED";
    } else if (combined.includes("h\xF3a h\u1ECDc") || combined.includes("hoa hoc") || combined.includes("nguy\xEAn t\u1EED") || combined.includes("ph\u1EA3n \u1EE9ng") || combined.includes("axit") || combined.includes("oxit")) {
      subject = "H\xF3a h\u1ECDc";
    } else if (combined.includes("sinh h\u1ECDc") || combined.includes("sinh hoc") || combined.includes("t\u1EBF b\xE0o") || combined.includes("gen") || combined.includes("adn") || combined.includes("di truy\u1EC1n")) {
      subject = "Sinh h\u1ECDc";
    } else if (combined.includes("ti\u1EBFng anh") || combined.includes("english") || combined.includes("grammar") || combined.includes("vocabulary")) {
      subject = "Ti\u1EBFng Anh";
    } else {
      subject = "Tin h\u1ECDc";
    }
  }
  if (!term) {
    if (combined.includes("cuoi ki 1") || combined.includes("cu\u1ED1i k\xEC 1") || combined.includes("cu\u1ED1i k\xEC i") || combined.includes("cuoiki1") || combined.includes("hki") || combined.includes("hk1")) {
      term = "Cu\u1ED1i k\xEC I";
    } else if (combined.includes("giua ki 2") || combined.includes("gi\u1EEFa k\xEC 2") || combined.includes("gi\u1EEFa k\xEC ii") || combined.includes("giuaki2")) {
      term = "Gi\u1EEFa k\xEC II";
    } else if (combined.includes("cuoi ki 2") || combined.includes("cu\u1ED1i k\xEC 2") || combined.includes("cu\u1ED1i k\xEC ii") || combined.includes("cuoiki2") || combined.includes("hk2")) {
      term = "Cu\u1ED1i k\xEC II";
    } else if (combined.includes("on tap") || combined.includes("\xF4n t\u1EADp") || combined.includes("thuong xuyen") || combined.includes("th\u01B0\u1EDDng xuy\xEAn")) {
      term = "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn";
    } else {
      term = "Gi\u1EEFa k\xEC I";
    }
  }
  return { grade, subject, term };
}

// src/utils/randomEngine.ts
function createPRNG(seed) {
  let s = Math.floor(seed);
  return function() {
    s |= 0;
    s = s + 1831565813 | 0;
    let t = Math.imul(s ^ s >>> 15, 1 | s);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function hashSeed(input) {
  if (typeof input === "number") return Math.abs(Math.floor(input)) || 123456789;
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) || 987654321;
}
function shuffleArray(array, prng) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(prng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
function generateStudentExam(seedInput, bank, config, customAssignedCode) {
  const seed = hashSeed(seedInput);
  const prng = createPRNG(seed);
  let pool = bank;
  if (config.target_grade && config.target_grade !== "all") {
    const matched = pool.filter((q) => getQuestionClassification(q).grade === config.target_grade);
    if (matched.length > 0) pool = matched;
  }
  if (config.target_subject && config.target_subject !== "all") {
    const matched = pool.filter((q) => getQuestionClassification(q).subject === config.target_subject);
    if (matched.length > 0) pool = matched;
  }
  if (config.target_term && config.target_term !== "all") {
    const matched = pool.filter((q) => getQuestionClassification(q).term === config.target_term);
    if (matched.length > 0) pool = matched;
  }
  const singleChoicePool = pool.filter((q) => q.type === "single_choice");
  const trueFalsePool = pool.filter((q) => q.type === "true_false");
  const shuffledSingle = shuffleArray(singleChoicePool, prng);
  const shuffledTF = shuffleArray(trueFalsePool, prng);
  let desiredTotal = Number(config.total_questions_to_pick) || 0;
  if (!desiredTotal) {
    if (config.distribution) {
      desiredTotal = (Number(config.distribution.single_choice) || 0) + (Number(config.distribution.true_false) || 0);
    }
  }
  if (!desiredTotal || desiredTotal <= 0) {
    desiredTotal = Math.min(pool.length, 20);
  }
  let desiredSC;
  let desiredTF;
  if (config.distribution && typeof config.distribution.single_choice === "number" && typeof config.distribution.true_false === "number") {
    desiredSC = Math.max(0, config.distribution.single_choice);
    desiredTF = Math.max(0, config.distribution.true_false);
    const distSum = desiredSC + desiredTF;
    if (config.total_questions_to_pick && distSum !== config.total_questions_to_pick && distSum > 0) {
      const ratioSC = desiredSC / distSum;
      desiredSC = Math.round(config.total_questions_to_pick * ratioSC);
      desiredTF = config.total_questions_to_pick - desiredSC;
    }
  } else {
    if (shuffledTF.length > 0) {
      desiredTF = Math.min(shuffledTF.length, Math.max(1, Math.round(desiredTotal * 0.2)));
      desiredSC = desiredTotal - desiredTF;
    } else {
      desiredSC = desiredTotal;
      desiredTF = 0;
    }
  }
  let scCount = Math.min(desiredSC, shuffledSingle.length);
  let tfCount = Math.min(desiredTF, shuffledTF.length);
  let remainingNeeded = desiredTotal - (scCount + tfCount);
  if (remainingNeeded > 0 && scCount < shuffledSingle.length) {
    const addSC = Math.min(remainingNeeded, shuffledSingle.length - scCount);
    scCount += addSC;
    remainingNeeded -= addSC;
  }
  if (remainingNeeded > 0 && tfCount < shuffledTF.length) {
    const addTF = Math.min(remainingNeeded, shuffledTF.length - tfCount);
    tfCount += addTF;
    remainingNeeded -= addTF;
  }
  const pickedSingle = shuffledSingle.slice(0, scCount);
  const pickedTF = shuffledTF.slice(0, tfCount);
  const combinedOriginal = shuffleArray([...pickedSingle, ...pickedTF], prng);
  const assignedCode = customAssignedCode || String(100 + seed % 900);
  const sanitizedQuestions = combinedOriginal.map((q) => {
    if (q.type === "single_choice") {
      const shuffledOptions = shuffleArray(q.options, prng);
      const cleanOptions = shuffledOptions.map(({ id, text }) => ({ id, text }));
      const cleanQuestion = {
        id: q.id,
        type: "single_choice",
        prompt: q.prompt,
        tags: q.tags,
        options: cleanOptions
      };
      return cleanQuestion;
    } else {
      const cleanItems = q.items.map(({ id, text }) => ({ id, text }));
      const cleanQuestion = {
        id: q.id,
        type: "true_false",
        prompt: q.prompt,
        tags: q.tags,
        items: cleanItems
      };
      return cleanQuestion;
    }
  });
  return {
    sanitizedQuestions,
    pickedOriginalQuestions: combinedOriginal,
    assignedCode,
    seed
  };
}
function generateAllExamVariants(bank, config) {
  const count = Math.max(12, config.variants_count || 12);
  const baseCode = config.base_code || 101;
  const salt = config.session_salt || 2026;
  const variants = [];
  for (let i = 0; i < count; i++) {
    const code = String(baseCode + i);
    const variantSeed = hashSeed(`${config.exam_id}_code_${code}_salt_${salt}`);
    const exam = generateStudentExam(variantSeed, bank, config, code);
    variants.push({
      assignedCode: code,
      seed: exam.seed,
      sanitizedQuestions: exam.sanitizedQuestions,
      pickedOriginalQuestions: exam.pickedOriginalQuestions
    });
  }
  return variants;
}

// api_src/exam/start.ts
async function handler(req, res) {
  if (handleCors(req, res)) return;
  if ((req.method || "GET").toUpperCase() !== "POST") {
    return sendJson(res, 405, { error: "Method Not Allowed" });
  }
  try {
    const body = await parseJsonBody(req);
    const { student_name, student_class, pin, forceNew } = body;
    if (!student_name?.trim() || !student_class?.trim()) {
      return sendJson(res, 400, { error: "Vui l\xF2ng cung c\u1EA5p H\u1ECD t\xEAn v\xE0 M\xE3 l\u1EDBp h\u1ECDc" });
    }
    const normClass = student_class.trim().toUpperCase();
    const normName = student_name.trim();
    const classes = await getClasses();
    const config = await getExamConfig();
    const bank = await getQuestionBank();
    const matchedClass = classes.find((c) => c.code.trim().toUpperCase() === normClass);
    if (classes.length > 0) {
      if (!matchedClass) {
        return sendJson(res, 404, {
          error: `M\xE3 l\u1EDBp "${student_class}" kh\xF4ng t\u1ED3n t\u1EA1i tr\xEAn h\u1EC7 th\u1ED1ng! Vui l\xF2ng nh\u1EADp \u0111\xFAng m\xE3 l\u1EDBp \u0111\xE3 \u0111\u01B0\u1EE3c gi\xE1o vi\xEAn t\u1EA1o.`
        });
      }
      if (!matchedClass.isActive) {
        return sendJson(res, 403, {
          error: `Ph\xF2ng thi c\u1EE7a l\u1EDBp ${matchedClass.code} (${matchedClass.name}) hi\u1EC7n \u0111ang \u0110\xD3NG. Vui l\xF2ng li\xEAn h\u1EC7 gi\xE1o vi\xEAn!`
        });
      }
      const cleanPin = (pin || "").trim();
      if (matchedClass.pinCode && cleanPin !== matchedClass.pinCode.trim()) {
        return sendJson(res, 403, {
          error: `M\xE3 PIN b\xE0i thi cho l\u1EDBp ${matchedClass.code} kh\xF4ng ch\xEDnh x\xE1c!`
        });
      }
    } else if (config.access_pin && pin?.trim() !== config.access_pin.trim()) {
      return sendJson(res, 403, { error: "M\xE3 PIN ph\xF2ng thi kh\xF4ng h\u1EE3p l\u1EC7!" });
    }
    const classCfg = matchedClass?.examConfig || {};
    const effectiveTotal = classCfg.total_questions_to_pick ?? config.total_questions_to_pick ?? 10;
    let effectiveDist = classCfg.distribution;
    if (!effectiveDist && effectiveTotal) {
      const tf = Math.max(0, Math.min(6, Math.round(effectiveTotal * 0.2)));
      const sc = effectiveTotal - tf;
      effectiveDist = { single_choice: sc, true_false: tf };
    }
    const effectiveConfig = {
      ...config,
      ...classCfg,
      title: matchedClass?.examTitle || config.title,
      duration_minutes: classCfg.duration_minutes || config.duration_minutes,
      total_questions_to_pick: effectiveTotal,
      distribution: effectiveDist || config.distribution
    };
    const expectedQCount = effectiveConfig.exam_mode === "pdf" ? effectiveConfig.pdf_total_questions || (effectiveConfig.pdf_answer_key ? Object.keys(effectiveConfig.pdf_answer_key).length : 40) : effectiveTotal;
    if (!forceNew) {
      const existingSession = await getActiveStudentSession(normClass, normName);
      if (existingSession) {
        const elapsedSec = Math.floor((Date.now() - new Date(existingSession.startTime).getTime()) / 1e3);
        if (elapsedSec < existingSession.durationSeconds + 300 && existingSession.totalQuestions === expectedQCount) {
          const remainingSeconds = Math.max(10, existingSession.durationSeconds - elapsedSec);
          return sendJson(res, 200, {
            attemptId: existingSession.attemptId,
            assignedCode: existingSession.assignedCode,
            sanitizedQuestions: existingSession.sanitizedQuestions,
            durationSeconds: existingSession.durationSeconds,
            remainingSeconds,
            startTime: existingSession.startTime,
            isReconnected: true,
            classInfo: matchedClass ? {
              code: matchedClass.code,
              name: matchedClass.name,
              subject: matchedClass.subject,
              examTitle: matchedClass.examTitle
            } : void 0
          });
        }
      }
    }
    const attemptId = `att_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const durationSeconds = (effectiveConfig.duration_minutes || 45) * 60;
    const startTime = (/* @__PURE__ */ new Date()).toISOString();
    let assignedCode = "101";
    let seed = 2026;
    let sanitizedQuestions = [];
    if (effectiveConfig.exam_mode === "pdf") {
      const totalQ = expectedQCount;
      assignedCode = String(100 + Math.floor(Math.random() * 15));
      sanitizedQuestions = Array.from({ length: totalQ }, (_, i) => ({
        id: String(i + 1),
        type: "single_choice",
        prompt: `C\xE2u ${i + 1}`,
        tags: [effectiveConfig.target_subject || "\u0110\u1EC1 PDF"],
        options: [
          { id: "A", text: "A" },
          { id: "B", text: "B" },
          { id: "C", text: "C" },
          { id: "D", text: "D" }
        ]
      }));
    } else {
      const variants = generateAllExamVariants(bank, effectiveConfig);
      const pickedVariant = variants[Math.floor(Math.random() * variants.length)];
      assignedCode = pickedVariant.assignedCode;
      sanitizedQuestions = pickedVariant.sanitizedQuestions;
      seed = pickedVariant.seed;
    }
    await saveActiveStudentSession({
      attemptId,
      studentName: normName,
      studentClass: normClass,
      assignedCode,
      sanitizedQuestions,
      durationSeconds,
      startTime,
      totalQuestions: sanitizedQuestions.length
    });
    return sendJson(res, 200, {
      attemptId,
      assignedCode,
      seed,
      sanitizedQuestions,
      durationSeconds,
      remainingSeconds: durationSeconds,
      startTime,
      isReconnected: false,
      classInfo: matchedClass ? {
        code: matchedClass.code,
        name: matchedClass.name,
        subject: matchedClass.subject,
        examTitle: matchedClass.examTitle
      } : void 0
    });
  } catch (err) {
    console.error("Error starting exam on Vercel Function:", err);
    return sendJson(res, 500, { error: "L\u1ED7i m\xE1y ch\u1EE7 khi b\u1EAFt \u0111\u1EA7u b\xE0i thi: " + (err?.message || err) });
  }
}
export {
  handler as default
};
