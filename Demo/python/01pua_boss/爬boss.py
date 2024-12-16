import requests, time
from bs4 import BeautifulSoup

url = 'https://www.zhipin.com/web/geek/job-recommend'
url1 = 'https://www.zhipin.com/wapi/zpgeek/pc/recommend/job/list.json?city=101210100&experience=&payType=&partTime=&degree=&industry=&scale=&salary=&jobType=&encryptExpectId=&mixExpectType=&page=1&pageSize=15'
headers = {
'Content-Type': 'application/json',
# 'Accept': 'application/json, text/javascript, */*; q=0.01',
# 'Accept-Encoding': 'gzip, deflate',
# 'X-Requested-With': 'XMLHttpRequest',
'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
'zp_token': 'V2QtgiE-f02llgXdJqzR4QIS-w7D7UwQ~~|QtgiE-f02llgXdJqzR4QIS-w7DLexw~~',
'Cookie': '__g=sem_pz_bdpc_dasou_title; __l=l=%2Fwww.zhipin.com%2Fsem%2F10.html%3Fsid%3Dsem_pz_bdpc_dasou_title&r=https%3A%2F%2Fwww.baidu.com%2Fother.php%3Fsc.Ks00000T9wY4HdVmW2_9oQ26h-GLaMEJHn-nLYaDBfeh6N0ogeHOYfdEZWU60KG5-vQpQo81DPGsBtj15p8Su4MkU6t9U8hLQ8giTzNcP4My_0tryfkzA0Os-wBotBZSyuEnHIP9fwdQLCLrq3OO6QWHU1xW1GMplf5yxNSBRXy9mg1s8RoT8tXFIpg6eLjOa-vv8Y5A78SG0yxCst-cxBgCgOwa.Db_NR2Ar5Od663rj6t8AGSPticcYlm2erxX5DkAMHz3SZ-E8kstV1nU_ZQfxfCGRojPakEvTXb0.TLFWgv-b5HDkrfK1ThPGujYknHb0THY0IAYqmhq1TsKdTvNzgLw4TARqn0K9u7qYXgK-5Hn0IvqzujdBULP10ZFWIWYs0ZNzU7qGujYkPHmzrHmYPjDs0Addgv-b5HDvnW64P1n10AdxpyfqnHndrjDznWR0UgwsU7qGujYknW6zP6KsI-qGujYs0A-bm1dri6Kspyfqn1c0mv-b5Hc3n0KWThnqP1nLP0%26ck%3D696.0.71.450.156.NaN.NaN.0%26dt%3D1731477094%26wd%3Dboss%26tpl%3Dtpl_12826_33676_0%26l%3D1562964410%26ai%3D0_60872259_1_1%26us%3DlinkVersion%253D1%2526compPath%253D10036.0-10032.0%2526label%253D%2525E4%2525B8%2525BB%2525E6%2525A0%252587%2525E9%2525A2%252598%2526linkType%253D%2526linkText%253DBOSS%2525E7%25259B%2525B4%2525E8%252581%252598%2525E2%252580%252594%2525E2%252580%252594%2525E6%252589%2525BE%2525E5%2525B7%2525A5%2525E4%2525BD%25259C%2525EF%2525BC%25258C%2525E4%2525B8%25258ABOSS%2525E7%25259B%2525B4%2525E8%252581%252598%2525EF%2525BC%25258C&g=%2Fwww.zhipin.com%2Fsem%2F10.html%3Fsid%3Dsem_pz_bdpc_dasou_title&s=3&friend_source=0; Hm_lvt_194df3105ad7148dcf2b98a91b5e727a=1731477097; HMACCOUNT=7BAB6907E23088EB; lastCity=101210100; ab_guid=01d760b5-ee8b-472d-a976-ad62e13711a3; Hm_lpvt_194df3105ad7148dcf2b98a91b5e727a=1731477419; __fid=f5b7e5742498bb7209890f275a0b0964; __zp_stoken__=03dffMTXDncKzwrzCtjglDgcGCAA5IjMxI288MSE7NDo1NTQzPDU0ORUyJMKIwrcGfQJbw4J4MSA1ND41NToxNTgRMTnEs8KzMDQuwpXCswZ8B1%2FDggYYU3cGw77CtiDCpsK0AsOMwrIgIxDCtTM2OjILwrLCssK7O8KywrLCuzvCssKywrszNjIyKTJYVwMANjJAR1cAQVlCXVtIAEtKTyAyODA1wqnCn8O2LjcDBgICAw8LCwoPCAgJAQUICQwICAMGAgIDKTXCmMKzwrFdwoZbw6XElMKTwqbCn1nDucK5w7NNwpTCvEnCkcKXwpDCpMKkwoxMwqZVwqBiwpx9TGRXa15KQFRvblnCtsK4wrNoSnZqVn8IXVgJBDcOwrHCmw%3D%3D; wt2=DAr19u44NRIXKCmYaCDa-CtdvxcEmQQbxIaoWDH-9-FOfeNPX13JfLOY68pzEAFkDTgTtf3QvaPvtupS-EO-fyw~~; wbg=0; zp_at=2kcds06T-w0c-82lM-C-m85BDAYBgwIB-minGMnbngE~; __c=1731477097; __a=22508760.1731477097..1731477097.17.1.17.17; bst=V2QtgiE-f02llgXdJqzR4QIS-w7D7UwQ~~|QtgiE-f02llgXdJqzR4QIS-w7DLexw~~'
}
# params = {}

# params = {
#     'scene': 1,
#     'query': '前端',
#     'city': 101210100,
#     'experience': '',
#     'payType': '',
#     'partTime': '',
#     'degree': '',
#     'industry': '',
#     'scale': '',
#     'stage': '',
#     'position': '',
#     'jobType': '',
#     'salary': '',
#     'multiBusinessDistrict': '',
#     'multiSubway': '',
#     'page': 1,
#     'pageSize': 30,
# }

res = requests.get(url1, headers=headers)
if res.status_code == 200:
    # print(res.json())
    data = res.json()
    print(data['zpData'])
else:
    print('请求失败')
# data = res
# print(res.text)
# data = BeautifulSoup(res.text, 'html.parser')
# print(data)

# res = requests.get(url + '?query' + '前端' + '&city' + '101210100', headers)
# print(res.status_code)
# data = BeautifulSoup(res.text, 'html.parser')
# print(data)