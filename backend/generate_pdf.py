import os
import sys
import urllib.request

def main():
    print("=== STARTING COMPREHENSIVE VIETNAMESE MANUAL GENERATION ===")
    
    # 1. Install reportlab inside the container if not present
    try:
        from reportlab.lib.pagesizes import letter
        from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
        from reportlab.pdfbase import pdfmetrics
        from reportlab.pdfbase.ttfonts import TTFont
    except ImportError:
        print("Installing 'reportlab' package...")
        import subprocess
        subprocess.run([sys.executable, "-m", "pip", "install", "reportlab"], check=True)
        
        from reportlab.lib.pagesizes import letter
        from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
        from reportlab.pdfbase import pdfmetrics
        from reportlab.pdfbase.ttfonts import TTFont

    # 2. Download Roboto fonts for Vietnamese Unicode support
    app_dir = os.path.dirname(os.path.abspath(__file__))
    font_reg_path = os.path.join(app_dir, "Roboto-Regular.ttf")
    font_bold_path = os.path.join(app_dir, "Roboto-Bold.ttf")
    
    if not os.path.exists(font_reg_path):
        print("Downloading Roboto-Regular.ttf from raw GitHub...")
        urllib.request.urlretrieve(
            "https://raw.githubusercontent.com/googlefonts/roboto-2/main/src/hinted/Roboto-Regular.ttf", 
            font_reg_path
        )
        
    if not os.path.exists(font_bold_path):
        print("Downloading Roboto-Bold.ttf from raw GitHub...")
        urllib.request.urlretrieve(
            "https://raw.githubusercontent.com/googlefonts/roboto-2/main/src/hinted/Roboto-Bold.ttf", 
            font_bold_path
        )
        
    # Register fonts in ReportLab
    pdfmetrics.registerFont(TTFont('Roboto', font_reg_path))
    pdfmetrics.registerFont(TTFont('Roboto-Bold', font_bold_path))
    print("Fonts successfully registered!")

    # 3. Setup PDF document
    pdf_dir = os.path.join(app_dir, "data")
    os.makedirs(pdf_dir, exist_ok=True)
    pdf_path = os.path.join(pdf_dir, "knowledge-base.pdf")
    
    print(f"Creating comprehensive manual PDF at: {pdf_path}")
    doc = SimpleDocTemplate(
        pdf_path, 
        pagesize=letter,
        rightMargin=54, 
        leftMargin=54, 
        topMargin=54, 
        bottomMargin=54
    )
    
    styles = getSampleStyleSheet()
    
    # Custom Styles using Roboto
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Roboto-Bold',
        fontSize=24,
        leading=28,
        textColor='#0F172A',
        alignment=TA_CENTER,
        spaceAfter=10
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Roboto',
        fontSize=12,
        leading=16,
        textColor='#475569',
        alignment=TA_CENTER,
        spaceAfter=30
    )
    
    chapter_style = ParagraphStyle(
        'ChapterHeading',
        parent=styles['Heading2'],
        fontName='Roboto-Bold',
        fontSize=16,
        leading=20,
        textColor='#1E3A8A',
        spaceBefore=18,
        spaceAfter=12,
        keepWithNext=True
    )
    
    section_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading3'],
        fontName='Roboto-Bold',
        fontSize=12,
        leading=16,
        textColor='#0F172A',
        spaceBefore=10,
        spaceAfter=6,
        keepWithNext=True
    )
    
    body_style = ParagraphStyle(
        'SectionBody',
        parent=styles['Normal'],
        fontName='Roboto',
        fontSize=10,
        leading=14.5,
        textColor='#334155',
        alignment=TA_JUSTIFY,
        spaceAfter=8
    )
    
    bullet_style = ParagraphStyle(
        'BulletPoint',
        parent=styles['Normal'],
        fontName='Roboto',
        fontSize=10,
        leading=14.5,
        textColor='#334155',
        leftIndent=20,
        spaceAfter=5
    )
    
    story = []
    
    # --- PAGE 1: TITLE PAGE ---
    story.append(Spacer(1, 100))
    story.append(Paragraph("SỔ TAY HƯỚNG DẪN VẬN HÀNH & BẢO TRÌ THIẾT BỊ", title_style))
    story.append(Paragraph("HỘP VỆ SINH MÈO THÔNG MINH TỰ ĐỘNG NORA HALO ONE", title_style))
    story.append(Spacer(1, 20))
    story.append(Paragraph("Tài liệu Vận hành Toàn diện, Hướng dẫn Kỹ thuật và Quy định CSKH Chính thức", subtitle_style))
    story.append(Paragraph("Mã tài liệu: MAN-NORA-HALO1-V1.2 | Phát hành bởi NORA Customer Service Team", subtitle_style))
    story.append(Spacer(1, 150))
    story.append(Paragraph("BẢN QUYỀN THUỘC VỀ CÔNG TY CÔNG NGHỆ NORA VIỆT NAM", subtitle_style))
    story.append(PageBreak())
    
    # --- PAGE 2: CHAPTER 1 & 2 ---
    story.append(Paragraph("CHƯƠNG I: CẤU TẠO CHI TIẾT & THÔNG SỐ KỸ THUẬT", chapter_style))
    story.append(Paragraph(
        "Hộp vệ sinh mèo tự động thông minh NORA Halo One là bước đột phá kết hợp giữa công nghệ cao và triết lý thiết kế organic. "
        "Sản phẩm được tối ưu hóa cho không gian sống hiện đại, giúp khử mùi triệt để và tự động hóa chu trình vệ sinh cho thú cưng.",
        body_style
    ))
    
    story.append(Paragraph("1. Cấu tạo vật lý thiết bị", section_style))
    story.append(Paragraph(
        "• <b>Cabin xoay (Drum):</b> Dung tích 65 Lít làm bằng nhựa ABS kháng khuẩn mật độ cao, giảm thiểu mảng bám và chống trầy xước từ móng vuốt mèo.<br/>"
        "• <b>Đệm làm kín (NORA Seal):</b> Vòng silicon đúp lắp tại cửa khay chứa, tạo áp lực khép kín khi khay đóng để cô lập hoàn toàn mùi chất thải.<br/>"
        "• <b>Lưới lọc cát thông minh:</b> Mắt lưới 1.2 cm giúp lọc và tách hiệu quả các loại cát vón cục khỏi cát sạch một cách nhẹ nhàng.",
        body_style
    ))
    
    story.append(Paragraph("2. Các thông số kỹ thuật tiêu chuẩn", section_style))
    specs = [
        "<b>Trọng lượng mèo hỗ trợ:</b> Thiết bị được thiết kế tối ưu và khuyến nghị hỗ trợ mèo có cân nặng từ 1.5 kg đến tối đa 10.0 kg.",
        "<b>Độ ồn khi dọn dẹp:</b> Động cơ giảm tốc bánh răng hành tinh thế hệ mới giúp máy vận hành siêu êm với độ ồn cực thấp ≤ 36 dB không làm ảnh hưởng tới sinh hoạt gia đình.",
        "<b>Khay chứa chất thải:</b> Thể tích hộp chứa chất thải lớn 8 L (tự gom túi kín mùi) giúp lưu trữ rác thải lên đến 15 ngày liên tục.",
        "<b>Hệ thống Camera AI:</b> Camera mắt cá NORA Vision góc rộng 200 độ ghi hình Full HD 1080p, trang bị 6 đèn LED hồng ngoại ẩn 940nm hỗ trợ quan sát ban đêm rõ nét.",
        "<b>Mạng kết nối không dây:</b> Hỗ trợ kết nối Wi-Fi băng tần 2.4 GHz và Bluetooth giúp thiết lập cài đặt nhanh chóng trên ứng dụng NORA App.",
        "<b>Kích thước vật lý và Trọng lượng máy:</b> Kích thước chi tiết của thiết bị là 520 x 540 x 655 mm (tương ứng Rộng x Sâu x Cao), tổng trọng lượng tịnh của máy là 12.5 kg.",
        "<b>Công suất định mức và Nguồn điện:</b> Máy tiêu thụ công suất định mức 24 W sử dụng bộ nguồn Adapter đầu vào 12V - 2A đầu cắm DC đi kèm.",
        "<b>Cát tương thích tốt nhất:</b> Máy sử dụng tốt nhất với cát đất sét vón cục (bentonite), cát đậu nành hạt nhuyễn (tofu) đường kính dưới 2mm, cát hỗn hợp hữu cơ vón nhanh. <i>Khuyến cáo tránh xa cát thủy tinh không vón hoặc cát gỗ hạt thô vì gây kẹt lưới lọc.</i>"
    ]
    for spec in specs:
        story.append(Paragraph(f"• {spec}", bullet_style))
        
    story.append(Spacer(1, 10))
    story.append(Paragraph("CHƯƠNG II: HƯỚNG DẪN LẮP ĐẶT & KẾT NỐI ỨNG DỤNG NORA", chapter_style))
    story.append(Paragraph(
        "Để thiết bị hoạt động chính xác, quy trình lắp đặt cần tuân thủ nghiêm ngặt các hướng dẫn về mặt sàn và kết nối mạng.",
        body_style
    ))
    
    story.append(Paragraph("1. Vị trí đặt thiết bị tối ưu", section_style))
    story.append(Paragraph(
        "Đặt thiết bị trên bề mặt phẳng, cứng và vững chãi (như sàn gạch, sàn gỗ phẳng). <b>Tuyệt đối không đặt máy lên thảm dày hoặc thảm lông xốp có độ dày trên 0.5 cm</b>. "
        "Lớp thảm mềm sẽ làm giảm lực truyền đến cảm biến trọng lực đặt dưới 4 chân máy, dẫn đến sai lệch thông tin đo cân nặng hoặc làm chậm trễ cơ chế ngắt an toàn của NORA Guard. "
        "Đặt máy cách tường ít nhất 10 cm ở mọi phía để tránh va chạm khi cabin xoay dọn cát.",
        body_style
    ))
    
    story.append(Paragraph("2. Các bước kết nối NORA App", section_style))
    steps = [
        "Cắm bộ nguồn Adapter 12V-2A đi kèm vào nguồn điện sinh hoạt ổn định.",
        "Nhấn giữ phím nguồn trên thân máy trong 5 giây cho đến khi đèn tín hiệu LED nháy chậm màu xanh dương (trạng thái sẵn sàng kết nối).",
        "Bật Bluetooth và kết nối Wi-Fi trên điện thoại (đảm bảo mạng 2.4 GHz hoạt động, máy không hỗ trợ các mạng Wi-Fi doanh nghiệp yêu cầu đăng nhập trang web trung gian).",
        "Mở ứng dụng NORA App, chọn nút 'Thêm thiết bị' (+), ứng dụng sẽ tự động phát hiện thiết bị qua Bluetooth. Chọn kết nối và điền mật khẩu Wi-Fi của bạn.",
        "Dán tem QR code định danh thiết bị vào nắp bên của máy để dễ dàng truy xuất thông tin hỗ trợ kỹ thuật sau này."
    ]
    for i, step in enumerate(steps):
        story.append(Paragraph(f"<b>Bước {i+1}:</b> {step}", bullet_style))
        
    story.append(PageBreak())
    
    # --- PAGE 3: CHAPTER 3 & 4 ---
    story.append(Paragraph("CHƯƠNG III: QUY TẮC VẬN HÀNH AN TOÀN & CẢNH BÁO AN TOÀN MÈO CON", chapter_style))
    story.append(Paragraph(
        "An toàn của thú cưng là ưu tiên số một của NORA. Hệ thống cảm biến NORA Guard hoạt động liên tục nhằm bảo vệ tối đa cho các boss.",
        body_style
    ))
    
    story.append(Paragraph("1. Cơ chế cảm biến an toàn NORA Guard", section_style))
    story.append(Paragraph(
        "NORA Guard là sự kết hợp của 10 điểm cảm biến bao gồm cảm biến trọng lực đo tải trọng cabin, cảm biến hồng ngoại cửa vào phát hiện vật cản, và rada vi sóng quét chuyển động trong bán kính 1.5 mét trước lối vào. "
        "Chu trình dọn dẹp cát tự động sẽ chỉ bắt đầu khi cabin được xác định là trống hoàn toàn và không có chuyển động nào trong khu vực an toàn xung quanh máy trong ít nhất 5 phút. "
        "Nếu phát hiện bất kỳ sự hiện diện nào trong lúc máy đang quay dọn dẹp, máy sẽ ngay lập tức phanh dừng khẩn cấp và phát tiếng bíp cảnh báo, đồng thời gửi thông báo đẩy đến điện thoại chủ nuôi qua NORA App.",
        body_style
    ))
    
    story.append(Paragraph("2. Cảnh báo an toàn mèo con dưới 3 tháng tuổi", section_style))
    story.append(Paragraph(
        "<b>ĐẶC BIỆT QUAN TRỌNG:</b> Đối với mèo con dưới 3 tháng tuổi, mèo đang mang thai hoặc có trọng lượng nhỏ hơn 1.5 kg, chủ nuôi <b>BẮT BUỘC phải tắt chế độ dọn dẹp tự động trên ứng dụng</b>. "
        "Chuyển thiết bị sang chế độ 'Dọn thủ công' (Manual Mode). Ở chế độ này, máy sẽ không tự xoay dọn sau khi mèo rời đi. "
        "Khi thấy mèo đã đi vệ sinh và di chuyển ra xa thiết bị, chủ nuôi sẽ thực hiện dọn dẹp bằng cách bấm nút 'Clean' vật lý trên thân máy hoặc bấm nút 'Dọn dẹp ngay' trong ứng dụng NORA App. "
        "Quy tắc này giúp ngăn ngừa mọi rủi ro đáng tiếc do cơ thể mèo con quá nhẹ không kích hoạt được cảm biến trọng lực ở chân đế.",
        body_style
    ))
    
    story.append(Spacer(1, 10))
    story.append(Paragraph("CHƯƠNG IV: QUY TRÌNH BẢO TRÌ, VỆ SINH & BẢO DƯỠNG ĐỊNH KỲ", chapter_style))
    story.append(Paragraph(
        "Vệ sinh đúng cách và bảo dưỡng định kỳ giúp máy Halo One vận hành êm ái, tăng tuổi thọ và giữ cho không gian phòng luôn thơm mát.",
        body_style
    ))
    
    story.append(Paragraph("1. Dọn khay chứa chất thải (15 ngày/lần)", section_style))
    story.append(Paragraph(
        "Khi khay chứa chất thải đầy (hoặc sau mỗi 15 ngày sử dụng với 1 mèo; từ 7 đến 10 ngày sử dụng với 2 mèo; và sau mỗi 5 ngày đối với từ 3 mèo trở lên), ứng dụng NORA App sẽ báo đỏ và đèn LED trên máy nháy cảnh báo. "
        "Hãy thực hiện rút khay chứa ra. Cơ chế túi rút NORA Seal tự động thắt miệng túi lại để bụi bẩn và mùi hôi không thoát ra ngoài. "
        "Vứt bỏ túi rác cũ, lắp túi đựng chất thải NORA chuyên dụng mới vào khay, căn chỉnh phẳng bốn góc và đẩy khay vào vị trí khớp ban đầu.",
        body_style
    ))
    
    story.append(Paragraph("2. Vệ sinh tổng thể Cabin xoay (30 ngày/lần)", section_style))
    story.append(Paragraph(
        "• Đổ toàn bộ cát cũ trong cabin ra bằng cách chọn chế độ 'Đổ cát' (Empty Litter) trên ứng dụng hoặc nhấn đúp nút nguồn.<br/>"
        "• Tháo khóa an toàn phía sau và nhấc cabin xoay ra khỏi đế máy.<br/>"
        "• Cabin xoay có thể ngâm nước rửa sạch bằng xà phòng trung tính và bàn chải mềm. Hãy rửa sạch các cặn bẩn bám trên lưới lọc và sàn cao su.<br/>"
        "• <b>CẢNH BÁO NGUY HIỂM: Phần đế máy chứa động cơ, hệ thống bánh răng truyền động và bo mạch điều khiển tuyệt đối KHÔNG ĐƯỢC RỬA NƯỚC</b>. Chỉ sử dụng khăn ẩm vắt khô để lau chùi bụi bẩn bám trên bề mặt đế.<br/>"
        "• Để cabin khô tự nhiên hoàn toàn trước khi lắp lại vào đế máy để tránh ẩm ướt làm hỏng linh kiện điện tử bên trong.",
        body_style
    ))
    
    story.append(PageBreak())
    
    # --- PAGE 4: CHAPTER 5 & 6 (POL-WAR-01 & POL-SHP-01) ---
    story.append(Paragraph("CHƯƠNG V: CHÍNH SÁCH BẢO HÀNH & HỖ TRỢ KỸ THUẬT (POL-WAR-01)", chapter_style))
    story.append(Paragraph(
        "Công ty Công nghệ NORA Việt Nam cam kết mang lại sản phẩm chất lượng tốt nhất cùng chế độ hậu mãi chu đáo.",
        body_style
    ))
    
    story.append(Paragraph("1. Thời hạn và điều kiện bảo hành tiêu chuẩn", section_style))
    story.append(Paragraph(
        "Thiết bị NORA Halo One được bảo hành chính hãng **12 tháng** kể từ ngày kích hoạt thông qua ứng dụng NORA App. "
        "Chế độ bảo hành áp dụng cho các lỗi phần cứng phát sinh do lỗi của nhà sản xuất, bao gồm lỗi động cơ xoay, hỏng hệ thống cảm biến hồng ngoại/trọng lực, bo mạch chủ điều khiển bị lỗi kết nối hoặc camera không hoạt động.",
        body_style
    ))
    
    story.append(Paragraph("2. Các trường hợp bị từ chối bảo hành", section_style))
    story.append(Paragraph(
        "NORA có quyền từ chối bảo hành miễn phí và chuyển sang sửa chữa dịch vụ tính phí đối với các lỗi sau:<br/>"
        "• Thiết bị có dấu hiệu bị ngấm nước ở phần đế máy (do ngâm rửa nước hoặc mèo tè lệch dòng chảy thấm vào bo mạch bên dưới).<br/>"
        "• Cháy nổ linh kiện bo mạch do sử dụng nguồn điện không ổn định hoặc cắm sạc Adapter sai thông số (không dùng Adapter đi kèm chính hãng).<br/>"
        "• Thiết bị bị nứt vỡ, móp méo vỏ nhựa do va đập vật lý nặng từ bên ngoài hoặc rơi từ trên cao.<br/>"
        "• Khách hàng tự ý tháo mở thiết bị, sửa chữa bo mạch hoặc thay thế linh kiện tại các cơ sở không được ủy quyền bởi NORA.<br/>"
        "• Hao mòn tự nhiên theo thời gian (sờn sàn cao su silicon, mờ xước mặt camera).",
        body_style
    ))
    
    story.append(Paragraph("3. Kênh tiếp nhận hỗ trợ kỹ thuật", section_style))
    story.append(Paragraph(
        "Khi gặp sự cố vận hành, chủ nuôi liên hệ trực tiếp CS Team qua Hotline: **1900-NORA-CARE** (1900 6672) từ 8h00 đến 21h00 hàng ngày, "
        "hoặc gửi email về: **support@nora.vn** kèm theo video ghi lại tình trạng lỗi của máy để kỹ sư hỗ trợ chẩn đoán từ xa nhanh nhất.",
        body_style
    ))
    
    story.append(Spacer(1, 10))
    story.append(Paragraph("CHƯƠNG VI: CHÍNH SÁCH VẬN CHUYỂN & HỖ TRỢ LẮP ĐẶT (POL-SHP-01)", chapter_style))
    story.append(Paragraph(
        "Chúng tôi cung cấp dịch vụ giao hàng nhanh chóng và hỗ trợ kỹ thuật tận nơi giúp khách hàng có trải nghiệm mua sắm an tâm nhất.",
        body_style
    ))
    
    story.append(Paragraph("1. Phạm vi giao hàng và chi phí vận chuyển", section_style))
    story.append(Paragraph(
        "NORA miễn phí hoàn toàn chi phí vận chuyển tiêu chuẩn cho tất cả các đơn đặt hàng mua sản phẩm NORA Halo One trên phạm vi toàn quốc. "
        "Thời gian giao hàng đối với các quận nội thành Hà Nội và TP. Hồ Chí Minh là **24 - 48 giờ** kể từ khi xác nhận đơn hàng. "
        "Thời gian giao hàng tại các tỉnh thành khác dao động từ **3 đến 5 ngày làm việc** tùy thuộc vào địa chỉ thực tế.",
        body_style
    ))
    
    story.append(Paragraph("2. Dịch vụ hỗ trợ lắp đặt tận nhà", section_style))
    story.append(Paragraph(
        "Nhằm hỗ trợ tốt nhất cho khách hàng, NORA cung cấp dịch vụ giao hàng kết hợp lắp đặt, hướng dẫn kết nối ứng dụng và bàn giao trực tiếp tại nhà hoàn toàn **miễn phí** cho các khu vực nội thành thuộc **Hà Nội, Đà Nẵng và TP. Hồ Chí Minh**. "
        "Nhân viên kỹ thuật của NORA sẽ hỗ trợ kiểm tra vị trí đặt máy, kết nối mạng Wi-Fi và thực hiện kiểm tra an toàn 10 điểm NORA Guard cùng khách hàng trước khi bàn giao.",
        body_style
    ))
    
    story.append(PageBreak())
    
    # --- PAGE 5: CHAPTER 7 & 8 (POL-RET-02 & SOP-CS-01) ---
    story.append(Paragraph("CHƯƠNG VII: QUY ĐỊNH ĐỔI TRẢ & HOÀN TIỀN (POL-RET-02)", chapter_style))
    story.append(Paragraph(
        "NORA mong muốn mang lại sự hài lòng cao nhất cho cả bạn và thú cưng của bạn. Chính sách đổi trả được quy định rõ ràng dưới đây.",
        body_style
    ))
    
    story.append(Paragraph("1. Đổi trả do lỗi kỹ thuật (1 đổi 1 trong 30 ngày)", section_style))
    story.append(Paragraph(
        "Trong vòng **30 ngày** đầu tiên sử dụng, nếu thiết bị gặp lỗi kỹ thuật nghiêm trọng liên quan đến động cơ hoặc bo mạch điều khiển chính xác nhận do lỗi nhà sản xuất mà không thể khắc phục được bằng các bản cập nhật phần mềm, "
        "NORA sẽ thực hiện đổi mới thiết bị mới 100% tận nhà và miễn phí toàn bộ chi phí vận chuyển đổi trả cho khách hàng.",
        body_style
    ))
    
    story.append(Paragraph("2. Đổi trả do mèo không làm quen được thiết bị (Mát lòng chủ nuôi)", section_style))
    story.append(Paragraph(
        "Chúng tôi hiểu rằng một số bé mèo nhút nhát cần nhiều thời gian để thích nghi hoặc từ chối sử dụng thiết bị mới. "
        "NORA hỗ trợ nhận lại thiết bị đã qua sử dụng và hoàn tiền trong vòng **14 ngày** kể từ ngày nhận hàng dưới các điều kiện sau:<br/>"
        "• Thiết bị còn đầy đủ hộp đóng gói ban đầu, sách hướng dẫn, bộ nguồn Adapter và tem QR code không bị rách nát.<br/>"
        "• Thiết bị không bị móp méo, trầy xước nặng vỏ ngoài hoặc hư hỏng cơ học do lỗi người sử dụng.<br/>"
        "• Khách hàng chịu **phí dùng thử hao mòn và vệ sinh khử trùng cabin là 10% giá trị sản phẩm** (được trừ trực tiếp vào số tiền hoàn trả).<br/>"
        "• Khách hàng tự chịu chi phí vận chuyển máy về trung tâm kiểm định của NORA.",
        body_style
    ))
    
    story.append(Paragraph("3. Quy trình hoàn tiền", section_style))
    story.append(Paragraph(
        "Sau khi nhận lại máy tại trung tâm bảo hành và kiểm tra tình trạng đạt yêu cầu đổi trả, bộ phận tài chính của NORA sẽ tiến hành chuyển khoản hoàn tiền cho khách hàng trong vòng **5 đến 7 ngày làm việc**.",
        body_style
    ))
    
    story.append(Spacer(1, 10))
    story.append(Paragraph("CHƯƠNG VIII: QUY TRÌNH TIẾP NHẬN & GIẢI QUYẾT KHIẾU NẠI (SOP-CS-01)", chapter_style))
    story.append(Paragraph(
        "Mọi khiếu nại hoặc yêu cầu bảo trì đều được xử lý theo quy trình 3 cấp bậc nhằm rút ngắn tối đa thời gian chờ đợi của khách hàng.",
        body_style
    ))
    
    story.append(Paragraph("Quy trình xử lý chuẩn 3 bước", section_style))
    story.append(Paragraph(
        "<b>Bước 1: Chẩn đoán từ xa qua Log & Video:</b> Nhân viên CSKH tiếp nhận phản ánh, hỗ trợ hướng dẫn khách hàng gửi log lỗi của máy từ NORA App hoặc quay video clip ngắn gửi qua Zalo/Email. Đội ngũ kỹ sư sẽ chẩn đoán lỗi trong vòng **2 giờ làm việc**.<br/>"
        "<b>Bước 2: Hướng dẫn sửa lỗi nhanh tại chỗ:</b> Đối với các lỗi cơ bản (như sai lệch cảm biến do lệch thảm, kẹt cát do dùng sai kích thước cát), nhân viên hỗ trợ gọi video call hướng dẫn chủ nuôi căn chỉnh lại chân máy hoặc cài đặt lại app. Quá trình này xử lý dứt điểm 80% trường hợp.<br/>"
        "<b>Bước 3: Thu hồi bảo hành tận nhà:</b> Nếu xác định lỗi phần cứng cần thay thế linh kiện chuyên dụng, kỹ thuật viên NORA sẽ đến tận nơi trong vòng **24 giờ** tại Hà Nội và TP.HCM để thu hồi máy bảo hành. Khách hàng sẽ được **NORA cung cấp một máy Halo One khác để sử dụng tạm thời** trong suốt thời gian bảo hành máy chính (tối đa 7 ngày làm việc) để đảm bảo sinh hoạt của các boss không bị gián đoạn.",
        body_style
    ))
    
    story.append(PageBreak())
    
    # --- PAGE 6: CHAPTER 9 (FAQ-CS-01) ---
    story.append(Paragraph("CHƯƠNG IX: HỎI ĐÁP KHÁCH HÀNG CHI TIẾT (FAQ-CS-01)", chapter_style))
    
    faqs = [
        ("Máy NORA Halo One có giá bán chính thức là bao nhiêu?", 
         "Giá bán concept tiêu chuẩn của hộp vệ sinh mèo tự động NORA Halo One hiện nay là **8.900.000 VNĐ** (đơn giá đã bao gồm thuế VAT, gói bảo hành vàng 12 tháng tại nhà và miễn phí vận chuyển lắp đặt toàn quốc)."),
        
        ("NORA Halo One kết nối được với mạng Wi-Fi nào? Có dùng được 5G không?", 
         "Thiết bị hỗ trợ băng tần Wi-Fi 2.4GHz để tối ưu hóa khoảng cách phủ sóng xa và ổn định (không hỗ trợ mạng Wi-Fi băng tần 5.0 GHz hoặc các mạng Wi-Fi doanh nghiệp yêu cầu đăng nhập trang web trung gian), kết hợp với Bluetooth để hỗ trợ ghép nối nhanh chóng trên ứng dụng trong lần đầu thiết lập."),
        
        ("Tôi có thể dùng các loại cát gỗ lớn hoặc cát thủy tinh cho máy được không?", 
         "**Không nên.** Hãy tránh sử dụng các loại cát thủy tinh không vón cục hoặc cát gỗ hạt quá lớn. Vì các hạt cát thô này không thể lọt qua lưới lọc cát có kích thước 1.2 cm của cabin máy. Chúng sẽ bị giữ lại cùng với chất thải, dẫn đến việc cát sạch bị đổ bỏ lãng phí hoặc kẹt lưới lọc, làm giảm hiệu suất dọn dẹp tự động."),
        
        ("Có dùng máy được cho gia đình nuôi nhiều mèo không?", 
         "**Hoàn toàn được.** NORA App cho phép khởi tạo và lưu trữ tối đa **8 hồ sơ mèo** khác nhau. Hệ thống cảm biến trọng lực ở 4 chân máy đo khối lượng của từng bé với độ chính xác cao kết hợp với phân tích hình ảnh của camera NORA Vision để nhận dạng khuôn mặt/màu lông mèo, tự động phân loại lượt vào vệ sinh của từng boss."),
        
        ("Ứng dụng NORA App có chia sẻ được cho nhiều người cùng quản lý không?", 
         "**Được.** Bạn có thể chia sẻ quyền xem nhật ký sức khỏe hoặc quyền điều khiển máy dọn dẹp cho các thành viên trong gia đình thông qua tài khoản đăng ký số điện thoại NORA hoặc cho họ quét mã QR thiết bị được chia sẻ trong phần cài đặt quản lý thành viên trên app."),
        
        ("Nếu cúp điện đột ngột hoặc mất kết nối mạng Wi-Fi thì máy có hoạt động không?", 
         "Khi bị cúp điện, máy sẽ ngừng hoạt động hoàn toàn (không xoay dọn tự động). Khi có điện trở lại, máy sẽ tự động cân chuẩn lại trọng lượng và hoạt động bình thường. Trường hợp chỉ mất mạng Wi-Fi nhưng vẫn cắm điện, máy vẫn dọn dẹp cát tự động bình thường nhờ bo mạch điều khiển độc lập tích hợp sẵn bên trong, tuy nhiên lịch sử sử dụng và hình ảnh live-view sẽ không đồng bộ về điện thoại cho đến khi có mạng kết nối trở lại."),

        ("Màng khóa mùi sinh học có cần phải thay thế định kỳ không?", 
         "Để đạt hiệu suất khử mùi và diệt khuẩn tối đa, chúng tôi khuyến nghị thay thế màng khóa mùi sinh học định kỳ sau mỗi 60-90 ngày. Bạn có thể dễ dàng đặt mua màng thay thế chính hãng trực tiếp trên NORA App.")
    ]
    
    for i, (q, a) in enumerate(faqs):
        story.append(Paragraph(f"<b>Câu hỏi {i+1}: {q}</b>", body_style))
        story.append(Paragraph(f"<b>Trả lời:</b> {a}", body_style))
        story.append(Spacer(1, 6))
        
    doc.build(story)
    print("=== COMPREHENSIVE VIETNAMESE MANUAL GENERATION SUCCESSFUL ===")

if __name__ == '__main__':
    main()
