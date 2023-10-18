Sub ExtractImages()
    Dim objApp As Object
    Dim objPres As Object
    Dim objSlide As Object
    Dim objShape As Object
    Dim i As Integer
    Dim j As Integer
    Dim k As Integer

    ' 创建 PowerPoint 应用程序对象
    Set objApp = CreateObject("PowerPoint.Application")
    ' 打开需要提取图片的 PowerPoint 文件
    Set objPres = objApp.Presentations.Open("C:\Path\To\Your\Presentation.pptx")

    i = 1 ' 图片计数器
    ' 遍历每个幻灯片
    For Each objSlide In objPres.Slides
        j = 1 ' 形状计数器
        ' 遍历每个形状
        For Each objShape In objSlide.Shapes
            ' 检查形状是否是图片
            If objShape.Type = 13 Then
                ' 保存图片到指定路径
                objShape.Export "C:\Path\To\Save\Images\Image" & i & "_" & j & ".jpg", ppShapeFormatJPG
                j = j + 1
            End If
        Next objShape
        i = i + 1
    Next objSlide

    ' 关闭 PowerPoint 文件和应用程序对象
    objPres.Close
    objApp.Quit

    ' 释放对象引用
    Set objShape = Nothing
    Set objSlide = Nothing
    Set objPres = Nothing
    Set objApp = Nothing

    MsgBox "图片提取完成！"
End Sub
